import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { OatSheet } from '@/components/editorial/OatSheet';
import { siteConfig } from '@/config/site';

export interface PolicySection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface DraftPolicyPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: PolicySection[];
}

export function DraftPolicyPage({
  eyebrow,
  title,
  subtitle,
  sections,
}: DraftPolicyPageProps) {
  return (
    <div className="min-h-[100dvh] bg-navy text-oat pt-24 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Draft Review Banner */}
        <div
          role="status"
          className="rounded-[6px] border border-flame/60 bg-flame/15 px-4 py-3 flex items-start gap-3 text-xs text-oat"
        >
          <AlertTriangle className="w-4 h-4 text-peach shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-ui-label text-[10px] text-peach font-semibold tracking-wider">
              DRAFT — PENDING LEGAL / CA REVIEW BEFORE LAUNCH
            </p>
            <p className="text-sand mt-1 leading-relaxed">
              This policy is a pre-launch structural draft. Bracketed placeholders must be finalized
              with legal and tax counsel before enabling live public indexing or commercial transactions.
            </p>
          </div>
        </div>

        <header className="space-y-2 pb-4 border-b border-white/15">
          <span className="font-ui-label text-[10px] text-peach block">{eyebrow}</span>
          <h1 className="font-display text-4xl sm:text-5xl text-oat font-medium leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-sand max-w-2xl">{subtitle}</p>
        </header>

        <OatSheet tone="subtle" interactive={false} className="p-6 sm:p-8 space-y-7">
          {sections.map((section) => (
            <section key={section.title} className="space-y-2.5">
              <h2 className="font-display text-2xl text-oat font-medium">{section.title}</h2>
              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm text-sand leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-sand leading-relaxed">
                  {section.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="pt-5 border-t border-white/15 text-xs text-sand space-y-1.5">
            <p className="text-oat font-medium">Questions or Policy Requests</p>
            <p>
              Email:{' '}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-peach hover:text-oat underline underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>{' '}
              · Phone:{' '}
              <a
                href={`tel:+91${siteConfig.contactPhoneRaw}`}
                className="text-peach hover:text-oat underline underline-offset-4"
              >
                {siteConfig.contactPhone}
              </a>
            </p>
            <p className="pt-1">
              <Link href="/contact" className="text-peach hover:text-oat underline underline-offset-4">
                View Contact &amp; Grievance Officer Details
              </Link>
            </p>
          </div>
        </OatSheet>
      </div>
    </div>
  );
}
