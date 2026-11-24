// Paylaşılan statik kabuk: Suspense fallback'leri ve loading.tsx aynı iskeleti kullanır.
export default function RouteSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-12" aria-busy="true">
      <div className="h-10 w-2/3 animate-pulse rounded-md bg-[#EAEAEA]" />
      <div className="h-4 w-1/2 animate-pulse rounded-md bg-[#EAEAEA]" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            className="animate-chip-in h-40 rounded-xl border border-[#EAEAEA] bg-white"
          />
        ))}
      </div>
    </main>
  );
}
