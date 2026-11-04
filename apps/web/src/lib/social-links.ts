import { Building2, Facebook, House, Instagram, Youtube, type LucideIcon } from "lucide-react";

/** Fano's social and portal profiles, used by the footer, the floating button and structured data */
export const SOCIAL_LINKS: { label: string; href: string; icon: LucideIcon; color: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fanoproperties",
    icon: Instagram,
    color: "linear-gradient(45deg, #f09433, #dc2743 50%, #bc1888)",
  },
  { label: "Facebook", href: "https://www.facebook.com/fanoproperties", icon: Facebook, color: "#1877f2" },
  { label: "YouTube", href: "https://www.youtube.com/@FanoProperties", icon: Youtube, color: "#ff0000" },
  {
    label: "Property Finder",
    href: "https://www.propertyfinder.ae/en/broker/fano-properties-l-l-c-v2-12901",
    icon: Building2,
    color: "#ef4b3f",
  },
  { label: "Bayut", href: "https://www.bayut.com/companies/fano-properties-109679/", icon: House, color: "#28b16d" },
];
