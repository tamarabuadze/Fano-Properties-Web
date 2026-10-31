export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-site py-12">
        {/* Header skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          <div className="h-9 w-56 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-80 rounded bg-gray-200 animate-pulse" />
        </div>

        <div className="flex gap-8">
          {/* Filter sidebar skeleton */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="rounded-2xl p-5 space-y-6" style={{ backgroundColor: "#1a1410" }}>
              <div className="h-4 w-16 rounded bg-white/20 animate-pulse" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
                  <div className="h-9 w-full rounded-xl bg-white/10 animate-pulse" />
                </div>
              ))}
            </div>
          </aside>

          {/* Grid skeleton */}
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-52 bg-gray-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-48 rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
