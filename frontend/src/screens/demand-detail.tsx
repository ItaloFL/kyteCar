import { useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import * as z from "zod";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

interface ProductInfo {
  id: string;
  imageURL: string;
}

interface Demand {
  id: string;
  name: string;
  price: number;
  yearCar: string;
  details: string;
  imageURL: string;
  brandName: string;
  product: ProductInfo;
  offer: number;
  paymentMethod: "pix" | "credit" | "cash";
}

const createHistoryType = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(40, "O nome não pode ultrapassar 40 caracteres"),
  price: z.string().min(4, "Preço não aceito, forneça um preço válido"),
  offer: z.string().min(4, "Oferta não aceita, forneça uma oferta válida"),
  yearCar: z.string().refine((value) => {
    const yearCarNumber = parseInt(value);
    return yearCarNumber >= 1995 && yearCarNumber <= 2024;
  }, "Forneça um ano valido entre 1995 e 2024"),
  brand: z.string().min(1, "Escolha uma marca de automóvel"),
  hasAccepted: z.boolean(),
  productId: z.string(),
});

type CreateHistoryType = z.infer<typeof createHistoryType>;

export function DemandDetail() {
  const { id } = useParams<{ id: string }>();
  const [demand, setDemand] = useState<Demand>();
  const { toast } = useToast();

  async function getDemandDetails() {
    const response = await api.get(`demand/${id}`);

    setDemand(response.data.demand);
  }

  async function handleCreateNewHistory(data: CreateHistoryType) {
    const { name, brand, price, yearCar, offer, productId, hasAccepted } = data;

    await api.post("history", {
      name,
      price,
      yearCar,
      brand,
      hasAccepted,
      offer,
      productId,
    });

    await new Promise((resolve) => setTimeout(resolve, 700));

    toast({
      title: "Resultado do pedido",
      description: `O pedido foi ${
        hasAccepted ? "Aceito" : "Recusado"
      }, verifique a pagina de historico.`,
      variant: hasAccepted ? "sucess" : "failed",
      className: "h-[95px]",
      action: (
        <ToastAction className="w-[70px]" altText="Goto schedule to undo">
          Ver
        </ToastAction>
      ),
    });
  }

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

  useEffect(() => {
    getDemandDetails();
  }, []);

  return (
    <div className="bg-slate-200 p-20">
      <div className="bg-slate-50 h-full rounded-md p-20">
        {demand && (
          <div className="flex gap-20 justify-center">
            <img
              src={demand.product.imageURL}
              className="h-[300px] w-[500px] object-cover rounded-md"
            />

            <div>
              <h3 className="text-2xl font-semibold">{demand.name}</h3>
              <p className="font-semibold text-xl mt-4">{demand.yearCar}</p>

              <div className="mt-6">
                <p className="text-lg">Metódo de pagamento</p>
                <p className="mt-2">
                  {mapPaymentMethodToText(demand.paymentMethod)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Valor do produto</p>
                <p className="text-lg font-bold">
                  {demand.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">Oferta realizada</p>
                <p className="text-lg font-bold">
                  {demand.offer.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>

              <div className="flex gap-5">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded"
                  onClick={() => {
                    handleCreateNewHistory({
                      name: demand.name,
                      brand: demand.brandName,
                      price: demand.price.toString(),
                      yearCar: demand.yearCar,
                      offer: demand.offer.toString(),
                      productId: demand.product.id,
                      hasAccepted: false,
                    });
                  }}
                >
                  Recusar oferta
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded"
                  onClick={() => {
                    handleCreateNewHistory({
                      name: demand.name,
                      brand: demand.brandName,
                      price: demand.price.toString(),
                      yearCar: demand.yearCar,
                      offer: demand.offer.toString(),
                      productId: demand.product.id,
                      hasAccepted: true,
                    });
                  }}
                >
                  Aceitar oferta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
