export const SEED_PRODUCTS = [
  {
    name: "Merino crew neck",
    price: 68,
    currency: "GHS",
    type: "PHYSICAL" as const,
    description: "Soft wool blend, ships in 3 days.",
  },
  {
    name: "Pro API plan (monthly)",
    price: 29,
    currency: "GHS",
    type: "DIGITAL" as const,
    description: "Unlimited sandbox calls.",
  },
  {
    name: "Onboarding session",
    price: 150,
    currency: "GHS",
    type: "SERVICE" as const,
    description: "60 min integration review.",
  },
];

export const TYPE_FILTERS = [
  { id: "PHYSICAL", label: "Physical" },
  { id: "DIGITAL", label: "Digital" },
  { id: "SERVICE", label: "Service" },
] as const;
