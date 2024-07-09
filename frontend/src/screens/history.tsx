import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { CircleCheck, CircleX } from "lucide-react";
import { api } from "../lib/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { TableHistorySkeleton } from "../components/skeletons/table-history-skeleton";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface History {
  id: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
  brandName: string;
  createdAt: Date;
  hasAccepted: boolean;
}

interface HistoryResponse {
  histories: History[];
  totalHistories: number;
}

export function History() {
  const [history, setHistory] = useState<History[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  async function getAllHistories() {
    const histories = await api.get<HistoryResponse>(`history?page=${page}`);

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setHistory(histories.data.histories);
    setTotalPages(Math.ceil(histories.data.totalHistories / 10));
    setLoading(false);
  }

  useEffect(() => {
    getAllHistories();
  }, [page]);

  return (
    <div className="bg-slate-200 p-20">
      <div className="bg-slate-50 h-full rounded-md p-[75px] ">
        <div className="min-h-[532px]">
          <Table>
            <TableHeader className="text-lg">
              <TableRow>
                <TableHead className="w-[143px]">Nome</TableHead>
                <TableHead className="w-[110px]">Preço</TableHead>
                <TableHead className="w-[110px]">Oferta</TableHead>
                <TableHead className="w-[80px]">Ano</TableHead>
                <TableHead className="w-[130px]">Marca</TableHead>
                <TableHead className="w-[130px]">Horário</TableHead>
                <TableHead className="w-[130px]">Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-base">
              {loading ? (
                <>
                  {[...Array(10)].map((_, index) => (
                    <TableHistorySkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {history.map((history: History) => {
                    return (
                      <TableRow key={history.id}>
                        <TableCell>{history.name}</TableCell>
                        <TableCell>
                          {history.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>
                          {history.offer.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>{history.yearCar}</TableCell>
                        <TableCell>{history.brandName}</TableCell>
                        <TableCell>
                          {formatDistanceToNow(history.createdAt, {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell className="flex ml-6">
                          {history.hasAccepted ? (
                            <CircleCheck color="#2ECC71" />
                          ) : (
                            <CircleX color="#E74C3C" />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination className="mt-11">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((prevPage) => Math.min(prevPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
