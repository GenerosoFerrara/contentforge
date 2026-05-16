import { useState, useCallback } from 'react';
import { buildPrompt } from '../utils/prompts';

const MOCK_RESPONSES = {
  product_description: `Introducing the **{product}** — engineered for those who refuse to compromise on quality.

**Key Features:**
- Premium build quality with attention to every detail
- Designed for seamless everyday use
- Energy-efficient technology for long-lasting performance
- Compatible with all major platforms and devices

Whether you're at home, in the office, or on the go, {product} adapts to your lifestyle. Backed by our 2-year warranty and 30-day money-back guarantee.

**→ Add to cart and experience the difference today.**`,

  meta_seo: `TITLE: {product} – Best Price & Fast Delivery | Shop Now
DESCRIPTION: Discover the {product}. Premium quality, competitive price. Free shipping on orders over €50. Order today and receive within 48h. ✓ 30-day returns.`,

  email_marketing: `SUBJECT: 🔥 {product} – Limited Stock Available
PREVIEW: Don't miss out — this offer won't last long.
BODY: Hi [First Name],

We wanted to make sure you don't miss out on one of our most popular products: the {product}.

Whether you're looking for reliability, style, or performance — this product delivers on all fronts. And right now, we're offering free shipping on all orders.

Here's what our customers are saying:
⭐⭐⭐⭐⭐ "Best purchase I made this year." – Marco R.

Stock is limited. Once it's gone, it's gone.
CTA: Shop Now – Free Shipping`,

  social_caption: `CAPTION 1:
Meet the {product} — your new everyday essential. 🙌 Designed for real life, built to last. Tap the link in bio to grab yours before stock runs out.
#newproduct #musthave #quality #lifestyle #shopping #ecommerce #deal #sale #onlineshopping

CAPTION 2:
Why settle for less? The {product} brings premium quality at a price that makes sense. 💡 Limited stock available — link in bio.
#premium #value #productlaunch #shopnow #instashop #trending #qualityproducts #deals

CAPTION 3:
The {product} is here and it's everything you've been looking for ✨ Free shipping on all orders this week only. Don't sleep on this one.
#limitedoffer #freeshipping #newarrival #shoplocal #style #lifestyle #onlinestore #sale`,

  abandoned_cart: `SUBJECT: You left something behind 👀 + 5% off inside
PREVIEW: Complete your order and save — offer expires in 24h.
BODY: Hi [First Name],

We noticed you left the {product} in your cart. Life gets busy — we get it!

But we'd hate for you to miss out, so here's a little nudge:

✅ Your item is still available
✅ Complete your order in the next 24 hours
✅ Get 5% off if your order is over €500, or free shipping if over €600

Use code: COMEBACK5 at checkout.

Still have questions? Reply to this email — we're happy to help.

CTA: Complete My Order →`,
};

function getMockResponse(type, product) {
  const template = MOCK_RESPONSES[type] || MOCK_RESPONSES.product_description;
  return template.replaceAll('{product}', product || 'this product');
}

export function useClaudeApi() {
  const [output,  setOutput]  = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const generate = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setOutput('');

    // Simulate API delay for realism
    await new Promise(r => setTimeout(r, 1400));

    const text = getMockResponse(formData.type, formData.product);
    setOutput(text);
    setLoading(false);
    return text;
  }, []);

  return { output, loading, error, generate, setOutput };
}