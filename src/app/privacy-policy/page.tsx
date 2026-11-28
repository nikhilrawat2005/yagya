import type { Metadata } from 'next';
import { DraftPolicyPage } from '@/components/legal/DraftPolicyPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Privacy Policy (Draft) — ${siteConfig.brandName}`,
  description: `Draft DPDP Act, 2023 privacy policy for ${siteConfig.brandName}.`,
};

export default function PrivacyPolicyPage() {
  const legalEntity = siteConfig.legalEntityName ?? '{{LEGAL_ENTITY_NAME}}';
  const registeredAddress = siteConfig.registeredAddress ?? '{{REGISTERED_ADDRESS}}';
  const grievanceName = siteConfig.grievanceOfficer.name ?? '{{GRIEVANCE_OFFICER_NAME}}';
  const grievanceDesignation =
    siteConfig.grievanceOfficer.designation ?? '{{GRIEVANCE_OFFICER_DESIGNATION}}';
  const grievanceEmail = siteConfig.grievanceOfficer.email ?? '{{GRIEVANCE_OFFICER_EMAIL}}';
  const grievancePhone = siteConfig.grievanceOfficer.phone ?? '{{GRIEVANCE_OFFICER_PHONE}}';

  return (
    <DraftPolicyPage
      eyebrow="Legal & Compliance Draft · DPDP Act, 2023"
      title="Privacy Policy"
      subtitle={`Structured for India's Digital Personal Data Protection (DPDP) Act, 2023 for ${siteConfig.brandName}.`}
      sections={[
        {
          title: '1. Data Fiduciary Identity',
          paragraphs: [
            `This website (${siteConfig.siteUrl}) and storefront for ${siteConfig.brandName} are operated by ${legalEntity} ("Data Fiduciary"), having its registered office at ${registeredAddress}.`,
            `For privacy notices and personal data requests, you can write to ${siteConfig.contactEmail} or call ${siteConfig.contactPhone}.`,
          ],
        },
        {
          title: '2. Personal Data Collected & Purpose',
          paragraphs: [
            'We collect only personal data strictly necessary for specified, lawful purposes with your clear consent:',
          ],
          bullets: [
            'Account & Identity Data: Name, email address, and optional contact details provided when creating an account or signing in.',
            'Order & Delivery Data: Recipient name, mobile number, delivery street address, city, state, and PIN code required to process and dispatch orders.',
            'Support & Enquiry Data: Messages and contact details submitted through our Contact form.',
          ],
        },
        {
          title: '3. Data Retention',
          paragraphs: [
            'Personal data is retained only for {{DATA_RETENTION_PERIOD}} or as required under applicable Indian tax, accounting, and food-safety record-keeping laws, after which it is securely erased or anonymized.',
          ],
        },
        {
          title: '4. Your Rights as a Data Principal (DPDP Act, 2023)',
          paragraphs: [
            'Subject to applicable Indian law, you have the right to:',
          ],
          bullets: [
            'Request a summary of personal data processed by us and the identities of any data processors.',
            'Request correction, completion, or updating of inaccurate or incomplete personal data.',
            'Request erasure of personal data no longer necessary for the specified purpose.',
            'Withdraw consent for non-essential processing at any time.',
            'Seek grievance redressal and nominate another individual to exercise rights on your behalf.',
          ],
        },
        {
          title: '5. Grievance Officer',
          paragraphs: [
            `In accordance with Indian e-commerce and data protection requirements, you may contact the Grievance Officer: ${grievanceName} (${grievanceDesignation}) at ${grievanceEmail} or ${grievancePhone}.`,
          ],
        },
      ]}
    />
  );
}
