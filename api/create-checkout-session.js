// Creates a Stripe Checkout session for the BSTR-01 Battery Saver with the buyer's
// quantity and the matching shipping tier (the old payment link could do neither).
// Settings mirror the payment link: US shipping address, phone, optional business
// name, automatic tax, post-payment invoice PDF, saved payment details, US dollars only.
//
// Vercel env vars (Settings -> Environment Variables):
//   STRIPE_SECRET_KEY - restricted key with "Checkout Sessions: Write"
//   STRIPE_PRICE_ID   - the $118.99 BSTR-01 price (price_...)
// Until both exist this returns 503 and the shop page falls back to the payment link.

// Keep in step with CONFIG.shipping in public/shop/index.html
const SHIPPING = [
  { min: 1, max: 2, cents: 1500, label: 'UPS Ground (1-2 units)' },
  { min: 3, max: 5, cents: 2500, label: 'UPS Ground (3-5 units)' },
  { min: 6, max: 10, cents: 5000, label: 'UPS Ground (6-10 units)' },
  { min: 11, max: 99, cents: 0, label: 'Free UPS Ground (11+ units)' },
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const key = process.env.STRIPE_SECRET_KEY;
  const price = process.env.STRIPE_PRICE_ID;
  if (!key || !price) return res.status(503).json({ error: 'Checkout not configured' });

  const qty = parseInt((req.body || {}).quantity, 10);
  const tier = SHIPPING.find(t => qty >= t.min && qty <= t.max);
  if (!tier) return res.status(400).json({ error: 'Quantity must be 1-99' });

  const origin = `https://${req.headers.host}`;
  const rate = 'shipping_options[0][shipping_rate_data]';
  const params = new URLSearchParams({
    mode: 'payment',
    'line_items[0][price]': price,
    'line_items[0][quantity]': String(qty),
    'shipping_address_collection[allowed_countries][0]': 'US',
    [`${rate}[type]`]: 'fixed_amount',
    [`${rate}[fixed_amount][amount]`]: String(tier.cents),
    [`${rate}[fixed_amount][currency]`]: 'usd',
    [`${rate}[display_name]`]: tier.label,
    [`${rate}[tax_behavior]`]: 'exclusive',
    [`${rate}[tax_code]`]: 'txcd_92010001', // Stripe's tax code for shipping
    'phone_number_collection[enabled]': 'true',
    'custom_fields[0][key]': 'business_name',
    'custom_fields[0][label][type]': 'custom',
    'custom_fields[0][label][custom]': 'Business name',
    'custom_fields[0][type]': 'text',
    'custom_fields[0][optional]': 'true',
    'automatic_tax[enabled]': 'true',
    'invoice_creation[enabled]': 'true',
    // Matches the payment link's "Save payment details for future use"
    customer_creation: 'always',
    'payment_intent_data[setup_future_usage]': 'off_session',
    'adaptive_pricing[enabled]': 'false', // dollars only; US buyers
    success_url: `${origin}/shop/thank-you`,
    cancel_url: `${origin}/shop`,
  });

  const stripe = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const session = await stripe.json();

  if (!stripe.ok) {
    console.error('Stripe error:', session.error && session.error.message);
    return res.status(502).json({ error: (session.error && session.error.message) || 'Stripe error' });
  }
  return res.status(200).json({ url: session.url });
};
