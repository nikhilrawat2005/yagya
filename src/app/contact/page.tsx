'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { GlowButton } from '@/components/ui/GlowButton';
import { GlowInput, GlowTextarea } from '@/components/ui/GlowInput';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/motion/tokens';
import {
  DoodleUnderline,
  DoodleSparkle,
  DoodleSwirl,
} from '@/components/doodles';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <FadeInSection className="relative text-center max-w-xl mx-auto mb-12">
        <DoodleSparkle
          delay={0.2}
          className="hidden sm:block absolute left-6 top-0 w-7 h-7 opacity-85"
        />
        <DoodleSwirl
          variant="loop"
          delay={0.3}
          className="hidden sm:block absolute -right-4 top-2 w-14 h-8 opacity-80"
        />
        <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
          Care &amp; Inquiries
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold mb-3">
          Write To{' '}
          <span className="relative inline-block text-cranberry italic">
            Yagya
            <DoodleUnderline
              variant="single"
              delay={0.2}
              className="absolute -bottom-1.5 left-0 w-full"
            />
          </span>
        </h1>
        <p className="font-script-body text-base text-indigo">
          Questions about harvest batches, wholesale orders, or delivery schedules.
        </p>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <FadeInSection
          direction="right"
          className="md:col-span-5 glow-border lift-hover bg-apricot/55 p-6 rounded-2xl border-2 border-charcoal/25 text-xs text-indigo space-y-5"
        >
          <div>
            <h2 className="font-sans text-sm font-semibold text-indigo mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-burnt icon-hover-pop" />
              <span>Direct Correspondence</span>
            </h2>
            <p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="nav-link-underline nav-link-underline-left font-mono-meta font-bold hover:text-burnt"
              >
                {siteConfig.contact.email}
              </a>
            </p>
            <p className="mt-1.5 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-burnt icon-hover-pop" />
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="nav-link-underline nav-link-underline-left font-mono-meta hover:text-burnt"
              >
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-indigo mb-1.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-burnt icon-hover-pop" />
              <span>Packing Hub</span>
            </h2>
            <p className="font-script-body text-sm">{siteConfig.contact.address}</p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-indigo mb-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-burnt icon-hover-pop" />
              <span>Response Cadence</span>
            </h2>
            <p className="font-script-body text-sm">
              Our care team replies within 24 business hours.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection
          direction="left"
          className="md:col-span-7 glow-border bg-apricot/40 p-6 sm:p-8 rounded-2xl border-2 border-charcoal/25"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE.smooth }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-oat border-2 border-charcoal/25 flex items-center justify-center shadow-[var(--glow-level-1)]">
                  <CheckCircle2 className="w-9 h-9 text-indigo" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-indigo mb-2">
                  Message Received
                </h3>
                <p className="font-script-body text-sm text-indigo max-w-xs mx-auto mb-6">
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
                  SEND MESSAGE
                </GlowButton>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeInSection>
      </div>
    </div>
  );
}
