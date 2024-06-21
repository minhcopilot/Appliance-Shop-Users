import { Skeleton } from "@/components/ui/skeleton";

export function VoucherSkeleton() {
  return (
    <div className="w-[1000px] grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="lg:w-full md:text-md bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="text-gray-600 text-sm mb-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex justify-center">
                <Skeleton className="h-10 w-300" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
