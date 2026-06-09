import React from "react";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-5 w-5 ${filled ? "text-[#FBBC04]" : "text-zinc-200"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const RATING = 4.9;
const REVIEW_COUNT = 312;
const FULL_STARS = Math.floor(RATING);

const highlights = [
  { label: "5 star", pct: 94 },
  { label: "4 star", pct: 5 },
  { label: "3 star", pct: 1 },
];

export function GoogleReviewsSection() {
  return (
    <section className="section-y bg-zinc-50">
      <div className="container-site">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-20">
          {/* Score card */}
          <div className="flex-shrink-0 text-center">
            {/* Google logo wordmark */}
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <svg viewBox="0 0 74 24" className="h-6 w-auto" aria-label="Google">
                <text x="0" y="20" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="700">
                  <tspan fill="#4285F4">G</tspan>
                  <tspan fill="#EA4335">o</tspan>
                  <tspan fill="#FBBC05">o</tspan>
                  <tspan fill="#4285F4">g</tspan>
                  <tspan fill="#34A853">l</tspan>
                  <tspan fill="#EA4335">e</tspan>
                </text>
              </svg>
              <span className="text-xs font-medium text-zinc-400 tracking-wide">Reviews</span>
            </div>

            <div className="text-7xl font-bold text-black [letter-spacing:-0.04em] leading-none mb-3">
              {RATING}
            </div>

            <div className="flex items-center justify-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= FULL_STARS} />
              ))}
            </div>

            <p className="text-sm text-zinc-500">
              Based on <span className="font-semibold text-black">{REVIEW_COUNT.toLocaleString()}</span> reviews
            </p>
          </div>

          {/* Bar chart + CTA */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="space-y-3 mb-8">
              {highlights.map(({ label, pct }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-14 text-xs text-zinc-500 shrink-0 text-right">{label}</span>
                  <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FBBC04] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-zinc-400 shrink-0">{pct}%</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://g.page/r/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                {/* Google G icon */}
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Write a Review
              </a>
              <a
                href="https://g.page/r/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-border text-sm font-medium text-black hover:bg-zinc-100 transition-colors"
              >
                Read All Reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
