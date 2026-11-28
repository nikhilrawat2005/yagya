import type { Metadata } from 'next';
import { DraftPolicyPage } from '@/components/legal/DraftPolicyPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Shipping Policy (Draft) — ${siteConfig.brandName}`,
  description: `Draft shipping and dispatch policy for ${siteConfig.brandName}.`,
};

export default function ShippingPolicyPage() {
  const dispatchTime = siteConfig.operations.dispatchWindowText ?? '{{DISPATCH_TIME}}';
  const shippingFee =
    siteConfig.operations.standardShippingFeeInr !== null
      ? `${siteConfig.currencySymbol}${siteConfig.operations.standardShippingFeeInr}`
      : '{{SHIPPING_FEE}}';
  const freeThreshold =
    siteConfig.operations.freeShippingThresholdInr !== null
      ? `${siteConfig.currencySymbol}${siteConfig.operations.freeShippingThresholdInr}`
      : '{{FREE_SHIPPING_THRESHOLD}}';

  return (
    <DraftPolicyPage
      eyebrow="Legal & Compliance Draft · Dispatch & Delivery"
      title="Shipping Policy"
      subtitle="Draft dispatch timelines, shipping fee structure, and serviceable regions across India."
      sections={[
        {
          title: '1. Dispatch Timeline',
          paragraphs: [
            `Confirmed orders are processed and handed over to courier partners within ${dispatchTime}, excluding public holidays and force majeure delays.`,
          ],
        },
        {
          title: '2. Shipping Charges & Thresholds',
          paragraphs: [
            `Standard shipping fee: ${shippingFee}. Orders above ${freeThreshold} qualify for free shipping once promotional thresholds are finalized and activated.`,
          ],
        },
        {
          title: '3. Serviceable Regions',
          paragraphs: [
            'Delivery coverage: {{SERVICEABLE_REGIONS}}. Serviceability for specific Indian PIN codes is confirmed prior to dispatch.',
          ],
        },
      ]}
    />
  );
}
