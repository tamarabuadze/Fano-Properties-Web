export const COMMERCIAL_LINKS = [
  { href: "/commercial-properties", label: "Commercial property in Dubai" },
  { href: "/commercial-properties/offices-for-sale", label: "Offices for sale" },
  { href: "/commercial-properties/business-bay", label: "Business Bay" },
  { href: "/commercial-properties/sheikh-zayed-road", label: "Sheikh Zayed Road" },
  { href: "/properties?category=commercial&listingType=lease", label: "Offices for lease" },
];

export const related = (self: string) => COMMERCIAL_LINKS.filter((l) => l.href !== self);
