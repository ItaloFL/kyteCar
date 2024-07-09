import { ScrollText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { TableDemandSkeleton } from "../components/skeletons/table-demand-skeleton";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

interface Demand {
  id: string;
  name: string;
  yearCar: string;
  brandName: string;
  price: number;
  offer: number;
  paymentMethod: "cash" | "credit" | "pix";
  createdAt: Date;
}

interface DemandResponse {
  demands: Demand[];
  totalDemands: number;
}

export function Demand() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentDemand, setCurrentDemand] = useState<Demand>();

  function mapPaymentMethodToText(paymentMethod: any) {
    switch (paymentMethod) {
      case "credit":
        return "Cartão de crédito";
      case "cash":
        return "Dinheiro";
      case "pix":
        return "Pix";
      default:
        return "";
    }
  }

  async function handleGetAllDemands() {
    const response = await api.get<DemandResponse>(`demand?page=${page}`);

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setDemands(response.data.demands);
    setTotalPages(Math.ceil(response.data.totalDemands / 10));
    setLoading(false);
  }

  async function handleGetCurrentDemand(id: string) {
    const response = await api.get<Demand>(`demand/${id}`);

    setCurrentDemand(response.data);
  }

  useEffect(() => {
    handleGetAllDemands();
  }, [page]);

  return (
    <div className="bg-slate-200 p-20">
      <div className="bg-slate-50 h-full rounded-md p-20">
        <div className="min-h-[532px]">
          <Table>
            <TableHeader className="text-lg">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Oferta</TableHead>
                <TableHead>Mét. Pagamento</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-base">
              {loading ? (
                <>
                  {[...Array(10)].map((_, index) => (
                    <TableDemandSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {demands.map((demand: Demand) => {
                    return (
                      <TableRow key={demand.id}>
                        <TableCell className="w-[177px]">
                          {demand.name}
                        </TableCell>
                        <TableCell className="w-[103px]">
                          {demand.yearCar}
                        </TableCell>
                        <TableCell className="w-[110px]">
                          {demand.brandName}
                        </TableCell>
                        <TableCell className="w-[100px]">
                          {demand.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className="w-[120px]">
                          {demand.offer.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className="w-[140px]">
                          {mapPaymentMethodToText(demand.paymentMethod)}
                        </TableCell>
                        <TableCell className="w-[140px]">
                          {formatDistanceToNow(demand.createdAt, {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell
                          className="w-[100px]"
                          onClick={() => {
                            handleGetCurrentDemand(demand.id);
                          }}
                        >
                          <Link to={`/demand/${demand.id}`}>
                            <ScrollText className="ml-5 text-zinc-400" />
                          </Link>
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
