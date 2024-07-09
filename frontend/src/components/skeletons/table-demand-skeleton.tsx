import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export function TableDemandSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-[12px] w-[140px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[74px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[80px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[82px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[80px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[102px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[92px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="flex ml-6 h-[28px] w-[28px] p-4 rounded-full" />
      </TableCell>
    </TableRow>
  );
}
