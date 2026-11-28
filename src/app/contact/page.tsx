'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Mail, Phone, MapPin, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { validateContactForm } from '@/lib/validation/forms';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput, GlowTextarea } from '@/components/ui/GlowInput';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { OatSheet } from '@/components/editorial/OatSheet';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { SplitText } from '@/components/react-bits/SplitText';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const grievanceName = siteConfig.grievanceOfficer.name ?? '{{GRIEVANCE_OFFICER_NAME}}';
  const grievanceDesignation =
    siteConfig.grievanceOfficer.designation ?? '{{GRIEVANCE_OFFICER_DESIGNATION}}';
  const grievanceEmail = siteConfig.grievanceOfficer.email ?? '{{GRIEVANCE_OFFICER_EMAIL}}';
  const grievancePhone = siteConfig.grievanceOfficer.phone ?? '{{GRIEVANCE_OFFICER_PHONE}}';
  const hasConfirmedGrievanceOfficer = Boolean(
    siteConfig.grievanceOfficer.name &&
      siteConfig.grievanceOfficer.email &&
      siteConfig.grievanceOfficer.phone
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        message?: string;
      };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setServerError(json.message || 'Please check your form details and try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('Unable to submit your message right now. Please email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'contact-01',
          chapterNumber: '01',
          chapterLabel: `Write To ${siteConfig.brandName}`,
          content: (
            <div className="max-w-5xl mx-auto">
              <FadeInSection className="relative text-center max-w-xl mx-auto mb-12">
                <SplitText
                  as="h1"
                  trigger="mount"
                  text={`Write To ${siteConfig.brandName}`}
                  className="font-display text-4xl sm:text-5xl text-oat font-medium mb-3"
                />
                <p className="text-sm sm:text-base text-apricot/95">
                  Questions about product batches, bulk enquiries, or upcoming availability.
                </p>
              </FadeInSection>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-5 space-y-5">
                  <OatSheet tone="subtle" className="p-6 text-xs text-oat space-y-5">
                    <div>
                      <h2 className="font-display text-lg font-medium text-oat mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-peach" aria-hidden="true" />
                        <span>Direct Correspondence</span>
                      </h2>
                      <p>
                        <a
                          href={`mailto:${siteConfig.contactEmail}`}
                          className="nav-link-underline text-apricot hover:text-oat"
                        >
                          {siteConfig.contactEmail}
                        </a>
                      </p>
                      <p className="mt-2 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-peach" aria-hidden="true" />
                        <a
                          href={`tel:+91${siteConfig.contactPhoneRaw}`}
                          className="nav-link-underline text-apricot hover:text-oat"
                        >
                          {siteConfig.contactPhone}
                        </a>
                      </p>
                    </div>

                    {siteConfig.packingAddress && (
                      <div>
                        <h2 className="font-display text-lg font-medium text-oat mb-1.5 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-peach" aria-hidden="true" />
                          <span>Packing Hub</span>
                        </h2>
                        <p className="text-sm text-apricot/90">{siteConfig.packingAddress}</p>
                      </div>
                    )}

                    {siteConfig.supportHours && (
                      <div>
                        <h2 className="font-display text-lg font-medium text-oat mb-1.5 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-peach" aria-hidden="true" />
                          <span>Support Hours</span>
                        </h2>
                        <p className="text-sm text-apricot/90">{siteConfig.supportHours}</p>
                      </div>
                    )}
                  </OatSheet>

                  {/* Grievance Officer Section */}
                  <OatSheet tone="subtle" interactive={false} className="p-6 text-xs text-sand space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display text-lg font-medium text-oat flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-peach" aria-hidden="true" />
                        <span>Grievance Officer</span>
                      </h2>
                      {!hasConfirmedGrievanceOfficer && (
                        <span className="font-ui-label text-[9px] px-2 py-0.5 rounded-[4px] border border-flame/50 bg-flame/15 text-peach">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="leading-relaxed">
                      In accordance with the Consumer Protection (E-Commerce) Rules, 2020 and DPDP
                      Act, 2023:
                    </p>
                    <dl className="space-y-1 text-[11px]">
                      <div>
                        <dt className="inline text-apricot/80">Name: </dt>
                        <dd className="inline text-oat">{grievanceName}</dd>
                      </div>
                      <div>
                        <dt className="inline text-apricot/80">Designation: </dt>
                        <dd className="inline text-oat">{grievanceDesignation}</dd>
                      </div>
                      <div>
                        <dt className="inline text-apricot/80">Email: </dt>
                        <dd className="inline text-oat">{grievanceEmail}</dd>
                      </div>
                      <div>
                        <dt className="inline text-apricot/80">Phone: </dt>
                        <dd className="inline text-oat">{grievancePhone}</dd>
                      </div>
                    </dl>
                  </OatSheet>
                </div>

                <div className="md:col-span-7 space-y-5">
                  <OatSheet tone="medium" interactive={false} className="relative z-10 p-6 sm:p-8">
                    <div className="relative z-10" aria-live="polite">
                      <AnimatePresence mode="wait">
                        {submitted ? (
                          <motion.div
                            key="submitted"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE.smooth }}
                            className="py-12 text-center"
                          >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
                              <CheckCircle2 className="w-8 h-8 text-peach" aria-hidden="true" />
                            </div>
                            <h3 className="font-display text-2xl font-medium text-oat mb-2">
                              Message Received
                            </h3>
                            <p className="text-sm text-apricot/90 max-w-xs mx-auto mb-6">
                              Thank you for writing to {siteConfig.brandName}. We have noted your
                              enquiry for {formData.email}.
                            </p>
                            <GlowButton
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setSubmitted(false);
                                setErrors({});
                                setFormData({ name: '', email: '', message: '' });
                              }}
                            >
                              Send Another Note
                            </GlowButton>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="contact-form"
                            noValidate
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-4 text-xs"
                          >
                            {serverError && (
                              <div
                                role="alert"
                                className="p-3 rounded-[6px] border border-flame/60 bg-flame/20 text-xs text-oat"
                              >
                                {serverError}
                              </div>
                            )}

                            <GlowInput
                              id="contact-name"
                              name="name"
                              autoComplete="name"
                              label="Your Name *"
                              floatingLabel
                              type="text"
                              value={formData.name}
                              error={errors.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({ ...errors, name: '' });
                              }}
                              placeholder="Aarav Singh"
                            />

                            <GlowInput
                              id="contact-email"
                              name="email"
                              autoComplete="email"
                              spellCheck={false}
                              label="Email Address *"
                              floatingLabel
                              type="email"
                              value={formData.email}
                              error={errors.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: '' });
                              }}
                              placeholder="aarav@example.com"
                            />

                            <GlowTextarea
                              id="contact-msg"
                              name="message"
                              label="Message *"
                              floatingLabel
                              rows={4}
                              value={formData.message}
                              error={errors.message}
                              onChange={(e) => {
                                setFormData({ ...formData, message: e.target.value });
                                if (errors.message) setErrors({ ...errors, message: '' });
                              }}
                              placeholder="Ask about batch details or product enquiries…"
                            />

                            <GlowButton
                              type="submit"
                              variant="cta"
                              magnetic
                              disabled={submitting}
                              className="w-full"
                            >
                              {submitting ? 'Sending Message…' : 'Send Message'}
                            </GlowButton>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </OatSheet>

                  {/* Food & Nutrition Disclaimer */}
                  <OatSheet tone="subtle" interactive={false} className="p-5 sm:p-6 text-xs text-sand space-y-2">
                    <h2 className="font-display text-lg font-medium text-oat flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-peach" aria-hidden="true" />
                      <span>Food &amp; Nutrition Disclaimer</span>
                    </h2>
                    <p className="leading-relaxed">{siteConfig.disclaimers.allergenGeneral}</p>
                    <p className="leading-relaxed">{siteConfig.disclaimers.nutritionIndicative}</p>
                    <p className="leading-relaxed">{siteConfig.disclaimers.healthAndMedical}</p>
                  </OatSheet>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'contact-02',
          chapterNumber: '02',
          chapterLabel: 'Bulk & Gifting',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 lg:col-start-4 relative">
                <OatSheet tone="warm" className="relative z-10 p-8 sm:p-10 space-y-4">
                  <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat leading-tight">
                    Custom festive hampers &amp; pantry enquiries.
                  </h2>
                  <p className="text-sm sm:text-base text-apricot/95 leading-relaxed">
                    For festive hampers, pantry refills, or bulk seasonal orders, share your
                    preferred items above or write to {siteConfig.contactEmail}.
                  </p>
                  <div className="pt-2">
                    <GlowButton href="/shop" variant="secondary">
                      Browse All Products
                    </GlowButton>
                  </div>
                </OatSheet>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
