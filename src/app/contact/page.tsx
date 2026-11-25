'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput, GlowTextarea } from '@/components/ui/GlowInput';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { OatSheet } from '@/components/editorial/OatSheet';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-dvh bg-aubergine text-oat pt-[calc(5.5rem+var(--safe-top))] pb-[calc(6rem+var(--safe-bottom))] md:pt-28 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-14 pl-[max(1rem,var(--safe-left))] pr-[max(1rem,var(--safe-right))]">
        <FadeInSection className="relative text-center max-w-xl mx-auto mb-10 md:mb-12">
          <DoodleSVG
            name="star"
            tone="flame"
            visibility="tablet-up"
            className="absolute left-6 top-0 w-7 h-7 opacity-85"
          />
          <DoodleSVG
            name="swirl"
            tone="apricot"
            visibility="tablet-up"
            className="absolute -right-4 top-2 w-16 h-8 opacity-80"
          />
          <span className="font-ui-label text-[11px] text-peach block mb-2">
            Care &amp; Inquiries
          </span>
          <h1 className="font-display text-fluid-h2 text-oat font-medium mb-3">
            Write To{' '}
            <span className="relative inline-block italic text-peach">
              Yagya
              <DoodleSVG
                name="underline"
                tone="flame"
                delay={0.2}
                className="absolute -bottom-1.5 left-0 w-full h-2.5"
              />
            </span>
          </h1>
          <p className="text-fluid-body text-apricot/85">
            Questions about harvest batches, wholesale orders, or delivery schedules.
          </p>
        </FadeInSection>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <OatSheet tone="subtle" padding="compact" className="md:col-span-5 text-sm text-oat space-y-6">
            <div>
              <h2 className="font-display text-lg font-medium text-oat mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-flame" />
                <span>Direct Correspondence</span>
              </h2>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="nav-link-underline min-h-[44px] text-apricot hover:text-oat"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="mt-1 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-flame" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="nav-link-underline min-h-[44px] text-apricot hover:text-oat"
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

          <OatSheet tone="medium" interactive={false} padding="default" className="md:col-span-7">
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
                    className="w-full sm:w-auto min-h-[44px]"
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
                  className="space-y-4 scroll-mb-24"
                >
                  <GlowInput
                    id="contact-name"
                    label="Your Name"
                    floatingLabel
                    type="text"
                    autoComplete="name"
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
                    autoComplete="email"
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

                  <GlowButton type="submit" variant="cta" magnetic className="w-full min-h-[48px]">
                    Send Message
                  </GlowButton>
                </motion.form>
              )}
            </AnimatePresence>
          </OatSheet>
        </div>
      </div>
    </div>
  );
}
