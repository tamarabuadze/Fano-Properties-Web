export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-site py-12">
        <div className="mb-10 space-y-3">
          <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
          <div className="h-9 w-40 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 rounded bg-gray-200 animate-pulse" />
                <div className="h-5 w-full rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
