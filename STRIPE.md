# Stripe Integration Guide

This document covers the Stripe payment integration for the React Starter Kit.

---

## Quick Start

### 1. Get Your API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** and **Secret key**
3. For testing, use the **test mode** keys (toggle at top of dashboard)

### 2. Environment Variables

Add these to your `.env` file:

```bash
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Payment Configuration
STRIPE_PAYMENT_MODE=subscription  # "subscription" or "payment" (one-time)
APP_URL=http://localhost:3000

# Optional: Custom redirect URLs
STRIPE_SUCCESS_URL=http://localhost:3000/billing/success?session_id={CHECKOUT_SESSION_ID}
STRIPE_CANCEL_URL=http://localhost:3000/pricing
```

### 3. Create Products & Prices in Stripe

**Option A: Via Stripe Dashboard**
1. Go to [Products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Set name, description, and pricing
4. Copy the **Price ID** (starts with `price_`)

**Option B: Via Rails Console**
```ruby
# Create a product
product = Stripe::Product.create(
  name: "Pro Plan",
  description: "Full access to all features"
)

# Create a recurring price
price = Stripe::Price.create(
  product: product.id,
  unit_amount: 1999,  # $19.99 in cents
  currency: "usd",
  recurring: { interval: "month" }
)

# Create a one-time price
price = Stripe::Price.create(
  product: product.id,
  unit_amount: 9900,  # $99.00 in cents
  currency: "usd"
)
```

### 4. Add Plans to Database

```ruby
# In Rails console or seeds.rb
Plan.create!(
  name: "Starter",
  description: "Perfect for individuals",
  stripe_price_id: "price_xxx",
  stripe_product_id: "prod_xxx",
  price_cents: 999,
  interval: "month",
  currency: "usd",
  features: ["5 projects", "Basic support", "1GB storage"],
  position: 1
)

Plan.create!(
  name: "Pro",
  description: "For growing teams",
  stripe_price_id: "price_yyy",
  stripe_product_id: "prod_yyy",
  price_cents: 2999,
  interval: "month",
  currency: "usd",
  features: ["Unlimited projects", "Priority support", "10GB storage", "API access"],
  position: 2
)

Plan.create!(
  name: "Enterprise",
  description: "For large organizations",
  stripe_price_id: "price_zzz",
  stripe_product_id: "prod_zzz",
  price_cents: 9900,
  interval: "month",
  currency: "usd",
  features: ["Everything in Pro", "Dedicated support", "Unlimited storage", "Custom integrations", "SLA"],
  position: 3
)
```

---

## Configuration Options

### Payment Modes

Set `STRIPE_PAYMENT_MODE` in your `.env`:

| Mode | Description |
|------|-------------|
| `subscription` | Recurring monthly/yearly billing |
| `payment` | One-time payment |

### Plan Intervals

| Interval | Description |
|----------|-------------|
| `month` | Monthly subscription |
| `year` | Yearly subscription |
| `one_time` | Single payment (no recurring) |

---

## Webhooks

### Local Development

Use [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/webhooks/stripe
```

Copy the webhook signing secret (`whsec_...`) to your `.env`.

### Production

1. Go to [Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the signing secret to your production environment

---

## Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/pricing` | GET | Pricing page with plans |
| `/billing/checkout` | POST | Create checkout session |
| `/billing/success` | GET | Success redirect after payment |
| `/billing/portal` | GET | Stripe Customer Portal |
| `/webhooks/stripe` | POST | Webhook endpoint |

---

## User Model Fields

| Field | Type | Description |
|-------|------|-------------|
| `stripe_customer_id` | string | Stripe Customer ID |
| `stripe_subscription_id` | string | Active subscription ID |
| `subscription_status` | string | `active`, `past_due`, `canceled`, `one_time` |
| `current_plan_id` | integer | Reference to Plan |

---

## Checking Subscription Status

```ruby
# In controllers or views
if Current.user.subscription_status == "active"
  # User has active subscription
end

if Current.user.current_plan&.name == "Pro"
  # User is on Pro plan
end

# Helper methods you might add to User model
def subscribed?
  subscription_status.in?(%w[active one_time])
end

def on_plan?(plan_name)
  current_plan&.name == plan_name
end
```

---

## Testing

### Test Card Numbers

| Card | Number | Use Case |
|------|--------|----------|
| Visa | `4242 4242 4242 4242` | Successful payment |
| Visa (Decline) | `4000 0000 0000 0002` | Card declined |
| Visa (3D Secure) | `4000 0025 0000 3155` | Requires authentication |

Use any future expiry date and any 3-digit CVC.

### Test Webhook Events

```bash
# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_failed
```

---

## Customer Portal

Users can manage their subscription via Stripe's hosted portal:

```ruby
# Redirect to portal
redirect_to billing_portal_path
```

Enable portal features in [Stripe Dashboard > Settings > Billing > Customer Portal](https://dashboard.stripe.com/settings/billing/portal).

---

## Security Notes

1. **Never expose `STRIPE_SECRET_KEY`** in frontend code
2. **Always verify webhook signatures** (already implemented)
3. **Use HTTPS in production** for all Stripe endpoints
4. **Store API keys in environment variables**, never in code

---

## Useful Links

- [Stripe Ruby SDK](https://github.com/stripe/stripe-ruby)
- [Stripe API Reference](https://docs.stripe.com/api?lang=ruby)
- [Checkout Sessions](https://docs.stripe.com/api/checkout/sessions)
- [Subscriptions](https://docs.stripe.com/api/subscriptions)
- [Webhooks](https://docs.stripe.com/webhooks)
- [Customer Portal](https://docs.stripe.com/billing/subscriptions/customer-portal)
- [Test Cards](https://docs.stripe.com/testing#cards)
