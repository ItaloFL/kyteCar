import { Skeleton } from "../ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <>
      <div className="flex justify-center gap-12">
        <div className="flex flex-col gap-10">
          <Skeleton className="h-[300px] w-[500px]" />

          <div>
            <Skeleton className="w-[170px] h-[32px]" />
            <Skeleton className="w-[120px] h-[20px] mt-4" />

            <div className="flex items-center gap-5 mt-4">
              <Skeleton className="h-[32px] w-[50px]" />

              <Skeleton className="h-[32px] w-[70px]" />
            </div>
          </div>
        </div>

        <Skeleton className="flex flex-col gap-10  h-[350px] w-[300px] rounded-sm border ml-28" />
      </div>
      ;
    </>
  );
}
