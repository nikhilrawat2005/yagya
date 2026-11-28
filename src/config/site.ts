export const siteConfig = {
  brandName: "Yagya",
  tagline: "Nurtured by Nature, Handcrafted by Tradition",
  description:
    "Crisp seeds, tart mountain berries, tender dry fruits, whole nuts, and seasoned makhana, packed in small batches for everyday Indian kitchens.",
  announcement: "Yagya · Nurtured by Nature, Handcrafted by Tradition",
  siteUrl: "https://yagya-nu.vercel.app",
  currency: "INR",
  currencySymbol: "₹",
  contactEmail: "info@yagyafoods.com",
  contactPhone: "+91 89208 85612",
  contactPhoneRaw: "8920885612",

  disclaimers: {
    nutritionIndicative:
      "Values shown are indicative averages and may vary by harvest batch.",
    healthAndMedical:
      "Product descriptions are for general informational purposes only and do not constitute medical advice.",
    allergenGeneral:
      "Please review ingredient and allergen details on each product page and physical pouch label prior to consumption.",
  },

  // Unconfirmed business/legal details: keep null until client provides them.
  // RULE: If a value is null, HIDE the UI element completely. Never render fake data.
  legalEntityName: null as string | null,       // {{LEGAL_ENTITY_NAME}}
  registeredAddress: null as string | null,     // {{REGISTERED_ADDRESS}}
  packingAddress: null as string | null,        // {{PACKING_ADDRESS}}
  supportHours: null as string | null,          // {{SUPPORT_HOURS}}
  fssaiLicenseNo: null as string | null,        // {{FSSAI_LICENSE_NO}}
  gstin: null as string | null,                 // {{GSTIN}}
  grievanceOfficer: {
    name: null as string | null,                // {{GRIEVANCE_OFFICER_NAME}}
    designation: null as string | null,         // {{GRIEVANCE_OFFICER_DESIGNATION}}
    email: null as string | null,               // {{GRIEVANCE_OFFICER_EMAIL}}
    phone: null as string | null,               // {{GRIEVANCE_OFFICER_PHONE}}
  },
  operations: {
    freeShippingThresholdInr: null as number | null, // {{FREE_SHIPPING_THRESHOLD}}
    standardShippingFeeInr: null as number | null,   // {{SHIPPING_FEE}}
    dispatchWindowText: null as string | null,       // {{DISPATCH_TIME}}
    returnWindowDays: null as number | null,         // {{RETURN_WINDOW_DAYS}}
  },
  socialLinks: {
    instagram: null as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
  },
  featureFlags: {
    showTestimonials: false,
    showRatingsAndReviews: false,
    showJournal: false,
    showPromoCodes: false,
    showTrustBadges: false,
    showPrices: false, // Set true only when real client MRPs/prices are populated
  },
} as const;

export type SiteConfig = typeof siteConfig;
