'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
          Care &amp; Inquiries
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold mb-3">
          Write To Yagya
        </h1>
        <p className="font-script-body text-base text-indigo">
          Questions about harvest batches, wholesale orders, or delivery schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 bg-apricot/55 p-6 rounded-2xl border-2 border-charcoal/25 text-xs text-indigo space-y-5">
          <div>
            <h2 className="font-sans text-sm font-semibold text-indigo mb-1">
              Direct Correspondence
            </h2>
            <p className="font-mono-meta font-bold">{siteConfig.contact.email}</p>
            <p className="font-mono-meta mt-1">{siteConfig.contact.phone}</p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-indigo mb-1">
              Packing Hub
            </h2>
            <p className="font-script-body text-sm">{siteConfig.contact.address}</p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-indigo mb-1">
              Response Cadence
            </h2>
            <p className="font-script-body text-sm">
              Our care team replies within 24 business hours.
            </p>
          </div>
        </div>

        <div className="md:col-span-7 bg-apricot/40 p-6 sm:p-8 rounded-2xl border-2 border-charcoal/25">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-indigo mx-auto mb-3" />
              <h3 className="font-display text-2xl font-semibold text-indigo mb-2">
                Message Received
              </h3>
              <p className="font-script-body text-sm text-indigo max-w-xs mx-auto">
                Thank you for writing. We will follow up at {formData.email} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="contact-name" className="block font-ui-label text-[11px] text-indigo mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aarav Singh"
                  className="w-full bg-oat border-2 border-charcoal/25 rounded-xl px-4 py-2.5 text-sm text-indigo focus:outline-none focus:border-indigo"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-ui-label text-[11px] text-indigo mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aarav@example.com"
                  className="w-full bg-oat border-2 border-charcoal/25 rounded-xl px-4 py-2.5 text-sm text-indigo focus:outline-none focus:border-indigo"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block font-ui-label text-[11px] text-indigo mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about batch details or bulk packs..."
                  className="w-full bg-oat border-2 border-charcoal/25 rounded-xl p-4 text-sm text-indigo focus:outline-none focus:border-indigo"
                />
              </div>

              <Button type="submit" className="w-full">
                SEND MESSAGE
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
