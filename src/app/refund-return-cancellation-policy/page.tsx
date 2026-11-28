import type { Metadata } from 'next';
import { DraftPolicyPage } from '@/components/legal/DraftPolicyPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Refund, Return & Cancellation Policy (Draft)',
  description: `Draft refund, return, and cancellation policy for ${siteConfig.brandName}.`,
};

export default function RefundReturnCancellationPolicyPage() {
  const returnWindow =
    siteConfig.operations.returnWindowDays !== null
      ? `${siteConfig.operations.returnWindowDays} days`
      : '{{RETURN_WINDOW_DAYS}}';

  return (
    <DraftPolicyPage
      eyebrow="Legal & Compliance Draft · Perishable Food Orders"
      title="Refund, Return & Cancellation Policy"
      subtitle="Draft guidelines covering order cancellations, damaged/incorrect food packs, and refund timelines."
      sections={[
        {
          title: '1. Order Cancellation',
          paragraphs: [
            'Orders may be requested for cancellation within {{CANCELLATION_WINDOW}} prior to dispatch by contacting us at our official support email or phone.',
          ],
        },
        {
          title: '2. Returns & Replacements for Food Products',
          paragraphs: [
            `Due to food-safety and hygiene standards for edible dry fruits, berries, seeds, nuts, and roasted makhana, opened or unsealed pouches are not eligible for return unless defective. Requests for damaged, tampered, expired, or incorrect items must be raised within ${returnWindow} of delivery with clear photographs of the outer box, batch label, and product pouch.`,
          ],
        },
        {
          title: '3. Refund Processing Timeline',
          paragraphs: [
            'Approved refunds for prepaid orders or cancelled shipments will be processed back to the original payment method within {{REFUND_TIMELINE_DAYS}} business days after verification.',
          ],
        },
      ]}
    />
  );
}
