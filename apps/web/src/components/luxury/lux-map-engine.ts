// The homepage map (slide 05): Dubai at night in Fano colours, with every Fano listing standing
// up as an illustrated gold tower, and a slow camera tour from one listing to the next.
// Map data: OpenFreeMap vector tiles (free, no key, OpenStreetMap data). Rendering: MapLibre GL.
// Kept free of React so the same code can be tried on its own in a browser.
// MapLibre itself is loaded from a CDN by lux-map.tsx, so only the parts used here are typed.

type LngLat = [number, number];
interface MlSource { setData(data: unknown): void }
interface MlMarker {
  getElement(): HTMLElement;
  setLngLat(at: LngLat): MlMarker;
  addTo(map: MlMap): MlMarker;
  remove(): void;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MlMap {
  on(type: string, fn: (e: any) => void): void;
  once(type: string, fn: (e: any) => void): void;
  getSource(id: string): MlSource | undefined;
  addSource(id: string, source: object): void;
  addLayer(layer: object): void;
  flyTo(options: object, eventData?: object): void;
  easeTo(options: object, eventData?: object): void;
  getBearing(): number;
  cameraForBounds(bounds: [LngLat, LngLat], options?: object): { center?: unknown; zoom?: number } | undefined;
  stop(): void;
  remove(): void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
export interface MapLibre {
  Map: new (options: object) => MlMap;
  Marker: new (options: { element: HTMLElement; anchor?: string }) => MlMarker;
}

export interface EnginePoint {
  title: string;
  area: string;
  kind: "office" | "shop" | "home" | "villa" | "hq";
  lng: number;
  lat: number;
}

export interface EngineCallbacks {
  onActive?: (index: number) => void;
  onTour?: (touring: boolean) => void;
}

const TILES = "https://tiles.openfreemap.org";
const NAME = ["coalesce", ["get", "name:en"], ["get", "name:latin"], ["get", "name"]];

// Dubai by night: espresso land, slate water, bronze and gold roads, dark towers so the gold ones lead
export function fanoMapStyle(): object {
  return {
    version: 8,
    glyphs: `${TILES}/fonts/{fontstack}/{range}.pbf`,
    sources: { omt: { type: "vector", url: `${TILES}/planet` } },
    sky: {
      "sky-color": "#120E0B",
      "horizon-color": "#4A3524",
      "fog-color": "#120E0B",
      "sky-horizon-blend": 0.7,
      "horizon-fog-blend": 0.55,
      "fog-ground-blend": 0.35,
      "atmosphere-blend": 0,
    },
    light: { anchor: "map", color: "#FFE3BD", intensity: 0.3, position: [1.4, 210, 40] },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": "#17110E" } },
      {
        id: "landuse",
        type: "fill",
        source: "omt",
        "source-layer": "landuse",
        paint: { "fill-color": "#1C1511", "fill-opacity": 0.8 },
      },
      {
        id: "park",
        type: "fill",
        source: "omt",
        "source-layer": "park",
        paint: { "fill-color": "#1E1B13", "fill-opacity": 0.85 },
      },
      {
        id: "landcover",
        type: "fill",
        source: "omt",
        "source-layer": "landcover",
        filter: ["in", ["get", "class"], ["literal", ["grass", "wood", "farmland"]]],
        paint: { "fill-color": "#1D1A13", "fill-opacity": 0.7 },
      },
      {
        id: "sand",
        type: "fill",
        source: "omt",
        "source-layer": "landcover",
        filter: ["==", ["get", "class"], "sand"],
        paint: { "fill-color": "#241A13", "fill-opacity": 0.6 },
      },
      {
        id: "water",
        type: "fill",
        source: "omt",
        "source-layer": "water",
        paint: { "fill-color": "#0D1316", "fill-outline-color": "#2A2119" },
      },
      {
        id: "roads-minor",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        minzoom: 12,
        filter: ["in", ["get", "class"], ["literal", ["minor", "service", "tertiary"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#31261E",
          "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.4, 16, 2.2],
        },
      },
      {
        id: "roads-main",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        filter: ["in", ["get", "class"], ["literal", ["primary", "secondary", "trunk"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#5E4835",
          "line-width": ["interpolate", ["linear"], ["zoom"], 9, 0.4, 16, 3.4],
        },
      },
      {
        id: "roads-glow",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#E2A862",
          "line-opacity": 0.2,
          "line-blur": 6,
          "line-width": ["interpolate", ["linear"], ["zoom"], 9, 4, 16, 22],
        },
      },
      {
        id: "roads-motorway",
        type: "line",
        source: "omt",
        "source-layer": "transportation",
        filter: ["==", ["get", "class"], "motorway"],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#C99A5B",
          "line-opacity": 0.85,
          "line-width": ["interpolate", ["linear"], ["zoom"], 9, 0.7, 16, 4.5],
        },
      },
      {
        id: "buildings",
        type: "fill-extrusion",
        source: "omt",
        "source-layer": "building",
        minzoom: 12.5,
        paint: {
          "fill-extrusion-color": [
            "interpolate", ["linear"], ["coalesce", ["get", "render_height"], 0],
            0, "#1E1712", 80, "#271E18", 250, "#30251D",
          ],
          "fill-extrusion-height": ["coalesce", ["get", "render_height"], 0],
          "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
          "fill-extrusion-opacity": ["interpolate", ["linear"], ["zoom"], 12.5, 0, 13.5, 0.85],
          "fill-extrusion-vertical-gradient": true,
        },
      },
      {
        id: "places",
        type: "symbol",
        source: "omt",
        "source-layer": "place",
        minzoom: 10.5,
        filter: ["in", ["get", "class"], ["literal", ["suburb", "neighbourhood", "quarter"]]],
        layout: {
          "text-field": NAME,
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 10.5, 9, 15, 12],
          "text-transform": "uppercase",
          "text-letter-spacing": 0.22,
          "text-max-width": 8,
        },
        paint: {
          "text-color": "#A39886",
          "text-opacity": 0.75,
          "text-halo-color": "#120E0B",
          "text-halo-width": 1.4,
        },
      },
    ],
  };
}

// A regular polygon around a point, radius in metres
function ring(lng: number, lat: number, r: number, sides: number, rot = 0): [number, number][] {
  const out: [number, number][] = [];
  const kx = 111320 * Math.cos((lat * Math.PI) / 180);
  for (let i = 0; i <= sides; i++) {
    const a = ((i % sides) / sides) * Math.PI * 2 + (rot * Math.PI) / 180;
    out.push([lng + (r * Math.cos(a)) / kx, lat + (r * Math.sin(a)) / 111320]);
  }
  return out;
}

type Tier = { r: number; sides: number; rot: number; base: number; top: number; tier: "podium" | "shaft" | "crown" };

// The illustrated towers: a podium, a shaft and a lit crown; homes and villas lower and wider.
// Heights are exaggerated on purpose so the towers read from across the city.
function tiersFor(kind: EnginePoint["kind"], i: number): Tier[] {
  const lift = (i % 3) * 45;
  switch (kind) {
    case "hq":
      return [
        { r: 80, sides: 4, rot: 45, base: 0, top: 50, tier: "podium" },
        { r: 50, sides: 8, rot: 22.5, base: 50, top: 340, tier: "shaft" },
        { r: 30, sides: 12, rot: 0, base: 340, top: 420, tier: "crown" },
      ];
    case "office":
      return [
        { r: 75, sides: 4, rot: 45, base: 0, top: 45, tier: "podium" },
        { r: 46, sides: 8, rot: 22.5, base: 45, top: 250 + lift, tier: "shaft" },
        { r: 26, sides: 12, rot: 0, base: 250 + lift, top: 310 + lift, tier: "crown" },
      ];
    case "home":
      return [
        { r: 65, sides: 4, rot: 45, base: 0, top: 35, tier: "podium" },
        { r: 48, sides: 4, rot: 0, base: 35, top: 200 + lift, tier: "shaft" },
        { r: 28, sides: 4, rot: 45, base: 200 + lift, top: 240 + lift, tier: "crown" },
      ];
    case "shop":
      return [
        { r: 82, sides: 4, rot: 45, base: 0, top: 60, tier: "podium" },
        { r: 50, sides: 6, rot: 0, base: 60, top: 130, tier: "shaft" },
        { r: 30, sides: 6, rot: 30, base: 130, top: 160, tier: "crown" },
      ];
    case "villa":
      return [
        { r: 95, sides: 4, rot: 45, base: 0, top: 30, tier: "podium" },
        { r: 62, sides: 4, rot: 15, base: 30, top: 64, tier: "shaft" },
        { r: 34, sides: 4, rot: 60, base: 64, top: 84, tier: "crown" },
      ];
  }
}

function towers(points: EnginePoint[], active: number, grow: number) {
  const features = points.flatMap((p, i) =>
    tiersFor(p.kind, i).map((t) => ({
      type: "Feature" as const,
      properties: { tier: t.tier, active: i === active, hq: p.kind === "hq", base: t.base * grow, top: t.top * grow },
      geometry: { type: "Polygon" as const, coordinates: [ring(p.lng, p.lat, t.r, t.sides, t.rot)] },
    }))
  );
  return { type: "FeatureCollection" as const, features };
}

function dots(points: EnginePoint[], active: number) {
  return {
    type: "FeatureCollection" as const,
    features: points.map((p, i) => ({
      type: "Feature" as const,
      properties: { active: i === active },
      geometry: { type: "Point" as const, coordinates: [p.lng, p.lat] },
    })),
  };
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function createFanoMap(ml: MapLibre, container: HTMLElement, points: EnginePoint[], cb: EngineCallbacks = {}) {
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const small = container.clientWidth < 700;

  const lngs = points.map((p) => p.lng);
  const lats = points.map((p) => p.lat);
  const bounds: [LngLat, LngLat] = [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];

  const map = new ml.Map({
    container,
    style: fanoMapStyle(),
    bounds,
    fitBoundsOptions: { padding: small ? 40 : { top: 90, bottom: 90, left: 380, right: 120 } },
    pitch: 0,
    bearing: 0,
    minZoom: 8.5,
    maxZoom: 17.5,
    maxPitch: 72,
    cooperativeGestures: true,
    attributionControl: { compact: true },
    canvasContextAttributes: { antialias: true },
  });

  let active = -1;
  let grow = reduce ? 1 : 0;
  let touring = false;
  let visible = true;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let destroyed = false;
  const markers: MlMarker[] = [];

  const overview = () => {
    const cam = map.cameraForBounds(bounds, { padding: small ? 40 : { top: 100, bottom: 100, left: 380, right: 120 } });
    return { center: cam?.center, zoom: Math.min((cam?.zoom ?? 10.5) + 0.25, 12.5), pitch: 56, bearing: -18 };
  };

  const refresh = () => {
    map.getSource("fano-towers")?.setData(towers(points, active, grow));
    map.getSource("fano-dots")?.setData(dots(points, active));
    markers.forEach((m, i) => m.getElement().toggleAttribute("data-active", i === active));
  };

  const setActive = (i: number) => {
    active = i;
    refresh();
    cb.onActive?.(i);
  };

  const clear = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };

  // Fly to a listing, then turn slowly around it
  const visit = (i: number, fromTour: boolean) => {
    const p = points[i];
    if (!p) return;
    setActive(i);
    const bearing = (map.getBearing() + 55) % 360;
    map.flyTo(
      {
        center: [p.lng, p.lat],
        zoom: small ? 14.6 : 15.2,
        pitch: 64,
        bearing,
        duration: reduce ? 0 : 5200,
        curve: 1.45,
        essential: false,
      },
      { fano: true }
    );
    if (!fromTour || reduce) return;
    map.once("moveend", () => {
      if (!touring || destroyed) return;
      map.easeTo({ bearing: bearing + 32, duration: 6500, easing: (t: number) => t }, { fano: true });
      timer = setTimeout(() => touring && next(), 6600);
    });
  };

  const next = () => {
    if (!touring || !visible || destroyed) return;
    const i = active + 1;
    if (i >= points.length) {
      // After the last listing, back out over the whole city before starting again
      setActive(-1);
      map.flyTo({ ...overview(), duration: 4800, essential: false }, { fano: true });
      timer = setTimeout(() => touring && next(), 7500);
      return;
    }
    visit(i, true);
  };

  const setTouring = (on: boolean) => {
    if (reduce) on = false;
    touring = on;
    clear();
    cb.onTour?.(on);
    if (on && visible) timer = setTimeout(next, 1200);
  };

  // Anything the visitor does to the map stops the tour; the panel has a button to start it again
  const userStop = (e: { originalEvent?: Event; fano?: boolean }) => {
    if (e.originalEvent && !e.fano && touring) {
      map.stop();
      setTouring(false);
    }
  };
  // A tile that fails to load (a slow network, a blocked host) leaves that patch dark; without a
  // listener MapLibre would print every such miss to the console
  map.on("error", () => {});
  map.on("dragstart", userStop);
  map.on("zoomstart", userStop);
  map.on("rotatestart", userStop);
  map.on("pitchstart", userStop);

  map.on("load", () => {
    if (destroyed) return;
    map.addSource("fano-towers", { type: "geojson", data: towers(points, active, grow) });
    map.addSource("fano-dots", { type: "geojson", data: dots(points, active) });
    map.addLayer({
      id: "fano-glow",
      type: "circle",
      source: "fano-dots",
      paint: {
        "circle-color": "#E2A862",
        "circle-blur": 1,
        "circle-pitch-alignment": "map",
        "circle-opacity": ["case", ["get", "active"], 0.55, 0.28],
        "circle-radius": ["interpolate", ["exponential", 2], ["zoom"], 9, 7, 12, 22, 15, 120, 17, 420],
      },
    });
    map.addLayer({
      id: "fano-towers",
      type: "fill-extrusion",
      source: "fano-towers",
      paint: {
        "fill-extrusion-color": [
          "case",
          ["==", ["get", "tier"], "podium"], ["case", ["get", "active"], "#B98A55", "#8C6A47"],
          ["==", ["get", "tier"], "crown"], ["case", ["get", "active"], "#FFF1D6", "#F7D597"],
          ["case", ["get", "active"], "#FFDDA0", "#E2A862"],
        ],
        "fill-extrusion-base": ["get", "base"],
        "fill-extrusion-height": ["get", "top"],
        "fill-extrusion-opacity": 0.96,
        "fill-extrusion-vertical-gradient": true,
      },
    });

    points.forEach((p, i) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "lx-pin" + (p.kind === "hq" ? " lx-pin-hq" : "");
      el.setAttribute("aria-label", `${p.title}, ${p.area}`);
      el.innerHTML = `<span class="lx-pin-dot"></span><span class="lx-pin-label"></span>`;
      (el.querySelector(".lx-pin-label") as HTMLElement).textContent = p.kind === "hq" ? "Fano Properties" : p.title;
      el.addEventListener("click", (ev) => {
        ev.stopPropagation();
        setTouring(false);
        visit(i, false);
      });
      markers.push(new ml.Marker({ element: el, anchor: "center" }).setLngLat([p.lng, p.lat]).addTo(map));
    });

    // Towers rise, the camera tilts down over the city, then the tour begins
    const start = performance.now();
    const rise = (t: number) => {
      if (destroyed) return;
      grow = ease(Math.min(1, (t - start) / 2600));
      refresh();
      if (grow < 1) requestAnimationFrame(rise);
    };
    if (!reduce) requestAnimationFrame(rise);
    map.easeTo({ ...overview(), duration: reduce ? 0 : 3800, essential: false }, { fano: true });
    if (!reduce) timer = setTimeout(() => setTouring(true), 5200);
  });

  return {
    map,
    goTo(i: number) {
      setTouring(false);
      if (i < 0) {
        setActive(-1);
        map.flyTo({ ...overview(), duration: reduce ? 0 : 3200, essential: false }, { fano: true });
      } else visit(i, false);
    },
    setTouring,
    setVisible(v: boolean) {
      visible = v;
      if (!v) {
        clear();
        map.stop();
      } else if (touring && !timer) timer = setTimeout(next, 800);
    },
    destroy() {
      destroyed = true;
      clear();
      markers.forEach((m) => m.remove());
      map.remove();
    },
  };
}

export type FanoMapController = ReturnType<typeof createFanoMap>;
