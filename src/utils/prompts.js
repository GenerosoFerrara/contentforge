export const CONTENT_TYPES = [
  { value: 'product_description', label: 'Product Description' },
  { value: 'meta_seo',            label: 'Meta Title + Description (SEO)' },
  { value: 'email_marketing',     label: 'Email Marketing Campaign' },
  { value: 'social_caption',      label: 'Social Media Caption' },
  { value: 'abandoned_cart',      label: 'Abandoned Cart Recovery Email' },
];

export const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly',     label: 'Friendly & Casual' },
  { value: 'persuasive',   label: 'Persuasive' },
  { value: 'luxury',       label: 'Luxury & Premium' },
  { value: 'urgent',       label: 'Urgent & FOMO' },
];

export const LANGUAGES = [
  { value: 'English',  label: 'English'  },
  { value: 'Italian',  label: 'Italian'  },
  { value: 'Spanish',  label: 'Spanish'  },
  { value: 'French',   label: 'French'   },
  { value: 'German',   label: 'German'   },
];

export function buildPrompt({ type, product, category, price, tone, language, extra }) {
  const base = `You are an expert eCommerce copywriter. Write content in ${language}. Tone: ${tone}.`;

  const context = [
    `Product: ${product}`,
    category ? `Category: ${category}` : '',
    price    ? `Price: ${price}`        : '',
    extra    ? `Extra info: ${extra}`   : '',
  ].filter(Boolean).join('\n');

  const instructions = {
    product_description: `Write a compelling product description (150-200 words) for an eCommerce store. Include key benefits, features, and a call to action. Format with a short intro paragraph followed by 3-4 bullet points of features, then a closing CTA sentence.`,

    meta_seo: `Write an SEO-optimised meta title (max 60 characters) and meta description (max 155 characters) for this product page. Format exactly as:
TITLE: [your title here]
DESCRIPTION: [your description here]
Include the main keyword naturally and a clear value proposition.`,

    email_marketing: `Write a complete marketing email to promote this product. Include:
- Subject line (max 50 chars, include an emoji)
- Preview text (max 90 chars)
- Email body (200-250 words) with a compelling offer
- Clear CTA button text
Format each section with a label like "SUBJECT:", "PREVIEW:", "BODY:", "CTA:".`,

    social_caption: `Write 3 variations of social media captions for this product. Each caption should:
- Be suitable for Instagram and Facebook
- Include relevant hashtags (5-8 per caption)
- Have a clear CTA
- Be between 50-150 words
Label each as CAPTION 1:, CAPTION 2:, CAPTION 3:.`,

    abandoned_cart: `Write an abandoned cart recovery email for a customer who added this product to their cart but didn't complete the purchase. Include:
- Subject line (create urgency, max 50 chars)
- Preview text
- Personalized email body (150-200 words) that addresses objections and offers a 5% discount if order > €500, or free shipping if order > €600
- Strong CTA
Format with labels: SUBJECT:, PREVIEW:, BODY:, CTA:.`,
  };

  return `${base}\n\n${context}\n\nTask: ${instructions[type]}`;
}
