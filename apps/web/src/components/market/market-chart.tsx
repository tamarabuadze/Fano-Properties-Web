"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { MarketPoint } from "@/lib/dubai-market";
import { formatPrice } from "./format";

// One series, drawn at the box's real pixel size: a 2px gold line over a faint gold wash, hairline
// gridlines, and a crosshair with a readout that snaps to the nearest month (mouse, touch or arrows).

const GOLD = "#E2A862";
const BOARD = "#1A1612";

const monthFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "Asia/Dubai" });
const yearOf = (iso: string) => Number(new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: "Asia/Dubai" }).format(new Date(iso)));
const monthOf = (iso: string) => Number(new Intl.DateTimeFormat("en-GB", { month: "numeric", timeZone: "Asia/Dubai" }).format(new Date(iso)));

function niceTicks(min: number, max: number, count = 3): number[] {
  const span = max - min || 1;
  const raw = span / count;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw) ?? raw;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

interface MarketChartProps {
  points: MarketPoint[];
  currency: string;
  /** Plain-language summary read out instead of the drawing */
  label: string;
  /** "feature" has price and year labels; "spark" is the bare line */
  variant?: "feature" | "spark";
  /** Fixed height in px; leave out and give `className` a height to fill the parent instead */
  height?: number;
  className?: string;
}

export function MarketChart({ points, currency, label, variant = "spark", height: fixedHeight, className = "" }: MarketChartProps) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const width = size.width;
  const height = fixedHeight ?? size.height;
  const [active, setActive] = useState<number | null>(null);
  const gradientId = useId().replace(/:/g, "");
  const feature = variant === "feature";

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setSize({ width: Math.round(entry?.contentRect.width ?? 0), height: Math.round(entry?.contentRect.height ?? 0) }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pad = feature ? { top: 12, right: 52, bottom: 26, left: 0 } : { top: 6, right: 6, bottom: 6, left: 2 };
  const geo = useMemo(() => {
    if (width === 0 || height < 40 || points.length < 2) return null;
    const closes = points.map((p) => p.c);
    const lo = Math.min(...closes);
    const hi = Math.max(...closes);
    const min = feature ? Math.max(0, lo - (hi - lo) * 0.12) : lo;
    const max = hi + (hi - lo) * (feature ? 0.08 : 0.04);
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;
    const x = (i: number) => pad.left + (i / (points.length - 1)) * innerW;
    const y = (v: number) => pad.top + (1 - (v - min) / (max - min || 1)) * innerH;
    const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.c).toFixed(1)}`).join("");
    const base = (pad.top + innerH).toFixed(1);
    const area = `${line}L${x(points.length - 1).toFixed(1)},${base}L${x(0).toFixed(1)},${base}Z`;
    const ticks = feature ? niceTicks(min, max) : [];
    const years = feature
      ? points.flatMap((p, i) => (monthOf(p.t) === 1 ? [{ i, year: yearOf(p.t) }] : []))
      : [];
    return { x, y, line, area, ticks, years, innerW };
  }, [width, height, points, feature, pad.left, pad.right, pad.top, pad.bottom]);

  const pick = (clientX: number) => {
    const el = box.current;
    if (!el || !geo) return;
    const rel = clientX - el.getBoundingClientRect().left - pad.left;
    const i = Math.round((rel / geo.innerW) * (points.length - 1));
    setActive(Math.min(points.length - 1, Math.max(0, i)));
  };

  const last = points.length - 1;
  const shown = active ?? null;
  const tipLeft = geo && shown !== null ? Math.min(Math.max(geo.x(shown), 56), width - 56) : 0;

  return (
    <div
      ref={box}
      className={`relative w-full select-none outline-none focus-visible:ring-1 focus-visible:ring-[#E2A862]/60 ${className}`}
      style={fixedHeight ? { height: fixedHeight } : undefined}
      role="img"
      aria-label={label}
      tabIndex={0}
      onPointerMove={(e) => pick(e.clientX)}
      onPointerDown={(e) => pick(e.clientX)}
      onPointerLeave={() => setActive(null)}
      onBlur={() => setActive(null)}
      onKeyDown={(e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        setActive((a) => Math.min(last, Math.max(0, (a ?? last) + (e.key === "ArrowRight" ? 1 : -1))));
      }}
    >
      {geo && (
        <svg width={width} height={height} className="block overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={GOLD} stopOpacity={feature ? 0.22 : 0.18} />
              <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
            </linearGradient>
          </defs>

          {geo.ticks.map((v) => (
            <g key={v}>
              <line x1={0} x2={width - pad.right + 8} y1={geo.y(v)} y2={geo.y(v)} stroke="rgba(247,241,232,0.08)" strokeWidth={1} />
              <text x={width - pad.right + 14} y={geo.y(v) + 4} fill="rgba(247,241,232,0.5)" fontSize={11} className="font-label">
                {v < 1 ? v.toFixed(2) : v % 1 ? v.toFixed(1) : v}
              </text>
            </g>
          ))}
          {geo.years.map(({ i, year }) => (
            <g key={year}>
              <line x1={geo.x(i)} x2={geo.x(i)} y1={height - pad.bottom} y2={height - pad.bottom + 5} stroke="rgba(247,241,232,0.25)" strokeWidth={1} />
              <text x={geo.x(i)} y={height - 6} textAnchor="middle" fill="rgba(247,241,232,0.5)" fontSize={11} className="font-label">
                {year}
              </text>
            </g>
          ))}

          <path d={geo.area} fill={`url(#${gradientId})`} />
          <path d={geo.line} fill="none" stroke={GOLD} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {shown !== null && (
            <line x1={geo.x(shown)} x2={geo.x(shown)} y1={pad.top} y2={height - pad.bottom} stroke="rgba(247,241,232,0.35)" strokeWidth={1} />
          )}
          {/* Today's price, or the month under the pointer, ringed in the board colour */}
          <circle
            cx={geo.x(shown ?? last)}
            cy={geo.y(points[shown ?? last]!.c)}
            r={feature ? 4.5 : 3.5}
            fill={GOLD}
            stroke={BOARD}
            strokeWidth={2}
          />
        </svg>
      )}

      {geo && shown !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 whitespace-nowrap rounded-[3px] border border-[#E2A862]/30 bg-[#120F0C]/95 px-2.5 py-1.5 text-center shadow-lg"
          style={{ left: tipLeft, transform: `translate(-50%, ${feature ? -4 : -110}%)` }}
        >
          <p className="font-label text-[9px] font-semibold uppercase tracking-[0.16em] text-[#F7F1E8]/55">
            {monthFmt.format(new Date(points[shown]!.t))}
          </p>
          <p className="text-[12px] font-semibold tabular-nums text-[#F7F1E8]">{formatPrice(points[shown]!.c, currency)}</p>
        </div>
      )}
    </div>
  );
}
