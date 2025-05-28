import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HistorySkeleton() {
  return (
    <div className="space-y-4">
      {/* Render 3 skeleton cards to simulate loading consultations */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              {/* Patient name skeleton */}
              <Skeleton className="h-6 w-48" />
              <div className="flex items-center gap-4">
                {/* Specialty badge skeleton */}
                <Skeleton className="h-6 w-20 rounded-full" />
                {/* Date skeleton */}
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Tabs skeleton */}
            <div className="mb-4 flex space-x-1 rounded-md bg-muted p-1">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
              {/* Patient information section */}
              <div>
                <Skeleton className="mb-2 h-5 w-40" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Skeleton className="mb-1 h-4 w-12" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div>
                    <Skeleton className="mb-1 h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div>
                    <Skeleton className="mb-1 h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>

              {/* Main complaint section */}
              <div>
                <Skeleton className="mb-2 h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Diagnosis section */}
              <div>
                <Skeleton className="mb-2 h-5 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
