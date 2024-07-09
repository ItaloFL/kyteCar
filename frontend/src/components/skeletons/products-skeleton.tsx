import { Skeleton } from "../ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="bg-zinc-200 h-[240px] w-[210px] rounded">
      <Skeleton className="h-[130px] w-full object-cover rounded" />
      <div className="flex flex-col justify-center items-center gap-8">
        <Skeleton className="mt-4 h-4 w-[150px] bg-zinc-300" />
        <div className="flex items-center justify-center gap-9">
          <Skeleton className="bg-zinc-300 h-[25px] w-[70px]" />
          <Skeleton className="bg-zinc-300 h-[30px] w-[80px]"/>
        </div>
      </div>
    </div>
  );
}
