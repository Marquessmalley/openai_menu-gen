import { Skeleton } from "@/components/UI/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-100 font-sans">
      <main className="w-full max-w-[2000px] mx-auto min-h-screen p-4 sm:p-5 md:p-6 flex flex-col">
        {/* Top widgets row - Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Main content area - Loading Skeleton */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 flex-1 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
