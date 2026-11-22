'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/data/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
          Care & Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal mb-3">
          Connect with the Atelier
        </h1>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Questions about specific harvest batches, bulk culinary inquiries, or feedback on your delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 text-xs text-on-surface-variant space-y-6">
          <div>
            <h4 className="font-serif text-sm font-semibold text-primary mb-1">Direct Correspondence</h4>
            <p className="font-medium text-primary">{siteConfig.contact.email}</p>
            <p className="mt-0.5">{siteConfig.contact.phone}</p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-primary mb-1">Harvest Packing Sanctuary</h4>
            <p>{siteConfig.contact.address}</p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-primary mb-1">Response Cadence</h4>
            <p>Our care team responds to every inquiry within 24 business hours.</p>
          </div>
        </div>

        <div className="md:col-span-7 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
          {submitted ? (
            <div className="py-12 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-2">check_circle</span>
              <h3 className="font-serif text-xl font-medium text-primary mb-1">Message Received</h3>
              <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                Thank you for writing. We will follow up with you at {formData.email} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-on-surface-variant font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Aarav Singh"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aarav@example.com"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant font-medium mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist your pantry ritual?"
                  className="w-full bg-surface border border-outline-variant/60 rounded-xl px-3.5 py-2.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-primary-container text-surface hover:bg-secondary text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
