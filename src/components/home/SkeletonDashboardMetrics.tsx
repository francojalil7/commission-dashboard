import {Skeleton} from "../ui/skeleton";

export function SkeletonDashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({length: 4}).map((_, i) => (
        <Skeleton key={+i} className="bg-muted/30 h-32 animate-pulse rounded-xl border" />
      ))}
    </div>
  );
}
