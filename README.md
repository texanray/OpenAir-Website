# OpenAir IoT Website Update - Battery Saver Shop

This update adds a product page for the Battery Saver Timer Relay with Stripe checkout integration.

## What's New

1. **Shop Page** (`/shop`) - Product page for the Battery Saver
2. **Navigation Update** - "Shop" link added to header
3. **Stripe Integration** - Checkout flow with tiered shipping
4. **Product Images** - Battery Saver photos in `/images/`
5. **SEO** - Product schema markup for Google rich results

## Setup Instructions

### Step 1: Update Your GitHub Repository

1. Open your `OpenAir-Website` repo folder on your computer
2. Copy these files/folders into it, **replacing** existing files:
   - `public/index.html` (updated with Shop nav link)
   - `public/shop/` folder (new)
   - `public/images/` folder (new)
   - `vercel.json` (updated with new redirects)

3. In PowerShell/Terminal:
   ```bash
   cd path/to/OpenAir-Website
   git add .
   git commit -m "Add Battery Saver shop page with Stripe checkout"
   git push
   ```

4. Vercel will auto-deploy within 1-2 minutes

### Step 2: Set Up Stripe Payment Link

The easiest approach (no backend needed):

1. Go to **Stripe Dashboard** > **Payment Links**
2. Make sure you're in the **OpenAir Solutions** account (not FoamMatch)
3. Click **+ Create payment link**
4. Add product:
   - Name: "Battery Saver Timer Relay"
   - Price: $114.99
   - One-time payment
5. Under "After payment", set confirmation page or redirect
6. **Enable "Let customers adjust quantity"**
7. Click **Create link**
8. Copy the link (looks like `https://buy.stripe.com/xxxxx`)

### Step 3: Update the Shop Page Code

Edit `public/shop/index.html` and find this line near the bottom:

```javascript
const paymentLinkBase = 'https://buy.stripe.com/YOUR_PAYMENT_LINK';
```

Replace `YOUR_PAYMENT_LINK` with your actual Stripe Payment Link.

### Step 4: Set Up Shipping in Stripe

In your Stripe Payment Link settings:
1. Click "Collect shipping address"
2. Under "Shipping rates", add:
   - "Standard (1-2 units)" - $15.00
   - "Standard (3-5 units)" - $25.00  
   - "Standard (6-10 units)" - $50.00
   - "Free Shipping (11+ units)" - $0.00

Or handle shipping calculation separately if you prefer.

## Shipping Tiers (configured in the page)

| Quantity | Shipping Cost |
|----------|---------------|
| 1-2      | $15.00        |
| 3-5      | $25.00        |
| 6-10     | $50.00        |
| 11-99    | FREE          |
| 100+     | Contact for quote (6-8 week lead time) |

## File Structure

```
public/
├── index.html          # Updated homepage with Shop link
├── logo.png            # Your existing logo
├── favicon.png         # Your existing favicon
├── shop/
│   └── index.html      # Battery Saver product page
└── images/
    ├── battery-saver-top.png    # Product image (top view)
    └── battery-saver-front.jpg  # Product image (front/branded)

vercel.json             # Redirects including /products → /shop
```

## Questions?

- Stripe setup help: https://stripe.com/docs/payment-links
- Vercel deployment: https://vercel.com/docs

OpenAir Solutions, LLC
support@OpenAirIoT.com
