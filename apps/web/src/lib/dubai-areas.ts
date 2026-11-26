// Where each Fano listing sits on the homepage map (slide 05).
// A listing with its own lat/lng is pinned exactly. Without one, it is placed at the centre of
// its community, read from the location text ("Business Bay", "Meydan", "Palm Jebel Ali" ...),
// and listings that share a community are spread out a little so their towers don't overlap.
// Listings whose community isn't recognised are left off the map rather than guessed.

export type MapKind = "office" | "shop" | "home" | "villa";

export interface MapProperty {
  slug: string;
  title: string;
  area: string;
  kind: MapKind;
  listing: "sale" | "rent";
  lng: number;
  lat: number;
  /** true when the listing has its own coordinates; false when it is placed by community */
  exact: boolean;
}

// [keywords, display name, [lng, lat]]: the more specific names come first
const AREAS: [string[], string, [number, number]][] = [
  [["marasi"], "Business Bay", [55.27, 25.1818]],
  [["business bay"], "Business Bay", [55.2666, 25.1837]],
  [["downtown", "burj khalifa", "opera district"], "Downtown Dubai", [55.277, 25.196]],
  [["difc", "financial centre", "financial center"], "DIFC", [55.281, 25.2125]],
  [["trade centre", "trade center", "world trade"], "Trade Centre", [55.286, 25.2245]],
  [["sheikh zayed"], "Sheikh Zayed Road", [55.2735, 25.2075]],
  [["jumeirah village triangle", "jvt"], "Jumeirah Village Triangle", [55.189, 25.044]],
  [["jumeirah village circle", "jvc"], "Jumeirah Village Circle", [55.209, 25.06]],
  [["jumeirah lake", "jlt"], "Jumeirah Lake Towers", [55.144, 25.0705]],
  [["palm jebel ali"], "Palm Jebel Ali", [54.9905, 25.003]],
  [["palm jumeirah"], "Palm Jumeirah", [55.1385, 25.1125]],
  [["bluewaters"], "Bluewaters", [55.1205, 25.0805]],
  [["emaar beachfront", "dubai harbour", "dubai harbor"], "Dubai Harbour", [55.142, 25.096]],
  [["marina"], "Dubai Marina", [55.1405, 25.0805]],
  [["sobha hartland", "mohammed bin rashid", "mohammad bin rashid", "mbr city"], "Sobha Hartland, MBR City", [55.3115, 25.178]],
  [["meydan"], "Meydan", [55.301, 25.161]],
  [["creek harbour", "creek harbor"], "Dubai Creek Harbour", [55.348, 25.201]],
  [["dubai hills"], "Dubai Hills Estate", [55.247, 25.1115]],
  [["barsha heights", "tecom"], "Barsha Heights", [55.1755, 25.0975]],
  [["al barsha", "barsha"], "Al Barsha", [55.2, 25.101]],
  [["media city"], "Dubai Media City", [55.156, 25.0925]],
  [["internet city"], "Dubai Internet City", [55.163, 25.096]],
  [["al quoz"], "Al Quoz", [55.232, 25.14]],
  [["city walk"], "City Walk", [55.262, 25.2065]],
  [["jaddaf"], "Al Jaddaf", [55.333, 25.219]],
  [["deira"], "Deira", [55.315, 25.271]],
  [["bur dubai"], "Bur Dubai", [55.295, 25.252]],
  [["silicon oasis"], "Dubai Silicon Oasis", [55.382, 25.121]],
  [["arjan"], "Arjan", [55.239, 25.062]],
  [["motor city"], "Motor City", [55.238, 25.046]],
  [["sports city"], "Dubai Sports City", [55.219, 25.039]],
  [["damac hills"], "DAMAC Hills", [55.248, 25.027]],
  [["al furjan", "furjan"], "Al Furjan", [55.146, 25.028]],
  [["dubai south", "expo city"], "Dubai South", [55.158, 24.897]],
  [["mirdif"], "Mirdif", [55.421, 25.219]],
  [["international city"], "International City", [55.407, 25.164]],
  [["jumeirah"], "Jumeirah", [55.245, 25.205]],
];

function findArea(text: string) {
  const t = text.toLowerCase();
  for (const [keys, name, at] of AREAS) if (keys.some((k) => t.includes(k))) return { name, at };
  return null;
}

/** Fano's own office, Churchill Executive Tower, Business Bay: marked on the map as the home base */
export const FANO_OFFICE = { title: "Fano Properties", area: "Churchill Executive Tower, Business Bay", lng: 55.2626, lat: 25.181 };

interface Row {
  slug: string;
  title: string;
  location: string;
  city: string;
  propertyType: string;
  listingType: string;
  unitType: string | null;
  lat: number | null;
  lng: number | null;
}

function kindOf(r: Row): MapKind {
  if (r.unitType === "shop" || r.unitType === "warehouse") return "shop";
  if (r.propertyType === "commercial" || r.unitType) return "office";
  if (r.propertyType === "villa" || r.propertyType === "house" || r.propertyType === "townhouse") return "villa";
  return "home";
}

export function placeOnMap(rows: Row[]): MapProperty[] {
  const perArea = new Map<string, number>();
  const out: MapProperty[] = [];
  for (const r of rows) {
    const area = findArea(`${r.location} ${r.city}`);
    const base = {
      slug: r.slug,
      title: r.title,
      kind: kindOf(r),
      listing: r.listingType === "sale" ? ("sale" as const) : ("rent" as const),
    };
    if (r.lat != null && r.lng != null && Math.abs(r.lat) > 0.01) {
      out.push({ ...base, area: area?.name ?? r.location, lng: r.lng, lat: r.lat, exact: true });
      continue;
    }
    if (!area) continue;
    // Spread listings in the same community along a small spiral, about 170 m apart
    const n = perArea.get(area.name) ?? 0;
    perArea.set(area.name, n + 1);
    const metres = n === 0 ? 0 : 170 * Math.sqrt(n);
    const angle = n * 2.39996;
    const [lng0, lat0] = area.at;
    const lat = lat0 + (metres * Math.sin(angle)) / 111320;
    const lng = lng0 + (metres * Math.cos(angle)) / (111320 * Math.cos((lat0 * Math.PI) / 180));
    out.push({ ...base, area: area.name, lng, lat, exact: false });
  }
  return out;
}
