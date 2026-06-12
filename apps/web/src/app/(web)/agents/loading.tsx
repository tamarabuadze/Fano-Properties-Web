export default function AgentsLoading() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-site py-12">
        <div className="mb-10 space-y-3">
          <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
          <div className="h-9 w-40 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse mx-auto" />
              <div className="space-y-2 text-center">
                <div className="h-5 w-32 rounded bg-gray-200 animate-pulse mx-auto" />
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
