'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput, GlowTextarea } from '@/components/ui/GlowInput';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { OatSheet } from '@/components/editorial/OatSheet';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'contact-01',
          chapterNumber: '01',
          chapterLabel: 'Write To Yagya',
          content: (
            <div className="max-w-5xl mx-auto">
        <FadeInSection className="relative text-center max-w-xl mx-auto mb-12">
          <span className="font-ui-label text-[11px] text-peach block mb-2">
            Care &amp; Inquiries
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-oat font-medium mb-3">
            Write To{' '}
            <span className="italic text-peach">
              Yagya
            </span>
          </h1>
          <p className="text-sm sm:text-base text-apricot/85">
            Questions about harvest batches, wholesale orders, or delivery schedules.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <OatSheet tone="subtle" className="md:col-span-5 p-6 text-xs text-oat space-y-6">
            <div>
              <h2 className="font-display text-lg font-medium text-oat mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-flame" />
                <span>Direct Correspondence</span>
              </h2>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="nav-link-underline text-apricot hover:text-oat"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-flame" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="nav-link-underline text-apricot hover:text-oat"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
            <div>
              <h2 className="font-display text-lg font-medium text-oat mb-1.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-flame" />
                <span>Packing Hub</span>
              </h2>
              <p className="text-sm text-apricot/85">{siteConfig.contact.address}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-medium text-oat mb-1.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-flame" />
                <span>Response Cadence</span>
              </h2>
              <p className="text-sm text-apricot/85">
                Our care team replies within 24 business hours.
              </p>
            </div>
          </OatSheet>

          <OatSheet tone="medium" interactive={false} className="md:col-span-7 p-6 sm:p-8">
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
                    <CheckCircle2 className="w-8 h-8 text-flame" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-oat mb-2">
                    Message Received
                  </h3>
                  <p className="text-sm text-apricot/85 max-w-xs mx-auto mb-6">
                    Thank you for writing. We will follow up at {formData.email} shortly.
                  </p>
                  <GlowButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                  >
                    Send Another Note
                  </GlowButton>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 text-xs"
                >
                  <GlowInput
                    id="contact-name"
                    label="Your Name"
                    floatingLabel
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aarav Singh"
                  />

                  <GlowInput
                    id="contact-email"
                    label="Email Address"
                    floatingLabel
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aarav@example.com"
                  />

                  <GlowTextarea
                    id="contact-msg"
                    label="Message"
                    floatingLabel
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about batch details or bulk packs..."
                  />

                  <GlowButton type="submit" variant="cta" magnetic className="w-full">
                    Send Message
                  </GlowButton>
                </motion.form>
              )}
            </AnimatePresence>
          </OatSheet>
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
              <OatSheet tone="warm" className="lg:col-span-6 lg:col-start-4 p-8 sm:p-10 space-y-4">
                <span className="font-ui-label text-[11px] text-peach block">
                  02 · Wholesale &amp; Harvest Gifting
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat leading-tight">
                  Custom festive hampers &amp; pantry refills.
                </h2>
                <p className="text-sm sm:text-base text-apricot/90 leading-relaxed">
                  For corporate gifting, café pantry partnerships, or bulk seasonal orders, share
                  your preferred harvests above and our packing hub will prepare a fresh-batch quote.
                </p>
                <div className="pt-2">
                  <GlowButton href="/shop" variant="secondary">
                    Browse All Harvests
                  </GlowButton>
                </div>
              </OatSheet>
            </div>
          ),
        },
      ]}
    />
  );
}
