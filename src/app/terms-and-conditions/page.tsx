import type { Metadata } from 'next';
import { DraftPolicyPage } from '@/components/legal/DraftPolicyPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Terms & Conditions (Draft) — ${siteConfig.brandName}`,
  description: `Draft Terms & Conditions for ${siteConfig.brandName} under Indian Consumer Protection and Legal Metrology rules.`,
};

export default function TermsAndConditionsPage() {
  const legalEntity = siteConfig.legalEntityName ?? '{{LEGAL_ENTITY_NAME}}';
  const registeredAddress = siteConfig.registeredAddress ?? '{{REGISTERED_ADDRESS}}';
  const gstin = siteConfig.gstin ?? '{{GSTIN}}';
  const fssai = siteConfig.fssaiLicenseNo ?? '{{FSSAI_LICENSE_NO}}';

  return (
    <DraftPolicyPage
      eyebrow="Legal & Compliance Draft · E-Commerce Rules, 2020 & Legal Metrology"
      title="Terms & Conditions"
      subtitle="Draft terms governing access, food product information, and orders on the Yagya storefront."
      sections={[
        {
          title: '1. Seller & Statutory Disclosures',
          paragraphs: [
            `This storefront for ${siteConfig.brandName} ("${siteConfig.tagline}") is operated by ${legalEntity}, registered at ${registeredAddress}.`,
            `GSTIN: ${gstin} · FSSAI License No.: ${fssai}.`,
          ],
        },
        {
          title: '2. Pricing, Currency & Taxes',
          paragraphs: [
            'All listed product prices, once published for commercial sale, will be stated in Indian Rupees (INR).',
            'GST and tax breakdown disclosure: {{GST_DISCLOSURE}}. Final payable totals including applicable taxes and shipping charges (if any) are shown before order confirmation.',
          ],
        },
        {
          title: '3. Packaged Commodities & Food Information',
          paragraphs: [
            'Net quantity, MRP, batch number, date of packing, best-before details, and FSSAI declarations are printed on each physical consumer package in accordance with Legal Metrology (Packaged Commodities) Rules and FSSAI labelling regulations.',
            siteConfig.disclaimers.nutritionIndicative,
            siteConfig.disclaimers.healthAndMedical,
          ],
        },
        {
          title: '4. Orders & Cancellations',
          paragraphs: [
            'All orders are subject to batch availability and address serviceability verification. Detailed cancellation and return eligibility terms are outlined in our Refund, Return & Cancellation Policy.',
          ],
        },
        {
          title: '5. Governing Law & Jurisdiction',
          paragraphs: [
            'These Terms & Conditions are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in {{GOVERNING_LAW_CITY}}, India.',
          ],
        },
      ]}
    />
  );
}
