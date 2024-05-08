import { TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export function TableHistorySkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-[12px] w-[125px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[77px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[77px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[40px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[12px] w-[96px]" />
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
