import { Check, NotepadText, ShoppingBag, Truck, Wrench } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { ProductDetailSkeleton } from "../components/skeletons/product-detail-skeleton";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

interface Product {
  id: string;
  name: string;
  price: number;
  yearCar: string;
  details: string;
  imageURL: string;
  brandName: string;
}

const createDemandType = z.object({
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
  details: z.string().min(2, "Forneça detalhes do automóvel"),
  brand: z.string().min(1, "Escolha uma marca de automóvel"),
  paymentMethod: z.enum(["credit", "cash", "pix"]),
});

type CreateDemandType = z.infer<typeof createDemandType>;

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateDemandType>({
    resolver: zodResolver(createDemandType),
  });

  async function getDetailProduct() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.get(`products/${id}`);
    setProduct(response.data.product);
    setLoading(false);
  }

  async function handleCreateANewDemand(data: CreateDemandType) {
    const { name, paymentMethod, brand, details, price, yearCar, offer } = data;

    await api.post("/demand", {
      name,
      paymentMethod,
      brand,
      details,
      price,
      yearCar,
      offer,
      productId: id,
    });
    setOpen(false);
    reset();

    await new Promise((resolve) => setTimeout(resolve, 700));

    toast({
      title: "Seu pedido foi realizado",
      description: `Confira na o seu pedido na página de pedidos`,
      className: "h-[95px]",
      variant: "sucess",
      action: (
        <ToastAction className="w-[70px]" altText="Goto schedule to undo">
          Ver
        </ToastAction>
      ),
    });
  }

  useEffect(() => {
    getDetailProduct();
  }, [id]);

  return (
    <div className="bg-slate-200 p-20">
      <div className="bg-slate-50 h-full rounded-md p-20">
        <div className="flex justify-center gap-9">
          {loading ? (
            <ProductDetailSkeleton />
          ) : (
            <>
              <div className="flex flex-col gap-10">
                <img
                  className="h-[300px] w-[500px] object-cover rounded-md"
                  src={product?.imageURL}
                  alt=""
                />
                <div>
                  <h1 className="text-2xl font-semibold">{product?.name}</h1>
                  <div className="flex items-center gap-1 mt-6">
                    <Check size={18} className="text-green-500" />
                    <span className="text-green-500 font-semibold">
                      Disponivel
                    </span>
                  </div>

                  <ul className="flex items-center gap-5 mt-4">
                    <li className="bg-zinc-200 py-1 px-2 rounded-sm">
                      {product?.yearCar}
                    </li>
                    <li className="bg-zinc-200 py-1 px-2 rounded-sm">
                      {product?.brandName}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-10 items-center p-7 h-[350px] w-[300px] rounded-sm border border-zinc-600 ml-28">
                <span className="font-semibold text-xl">
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="flex items-center justify-center gap-2 bg-zinc-200  p-3 rounded-sm text-lg font-semibold hover:bg-zinc-300 hover:transition-colors cursor-pointer">
                    <ShoppingBag size={19} />
                    Realizar pedido
                  </DialogTrigger>
                  <DialogContent className="min-h-[530px]">
                    <DialogHeader>
                      <DialogTitle>Crie um pedido</DialogTitle>
                      <DialogDescription>
                        Realize um pedido de um dos nossos produtos
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleCreateANewDemand)}>
                      <Label>Nome</Label>
                      <Input
                        contentEditable={false}
                        value={product?.name}
                        {...register("name")}
                      />

                      <Label>Preço</Label>
                      <Input
                        contentEditable={false}
                        value={product?.price}
                        {...register("price")}
                      />

                      <Label>Oferta</Label>
                      <Input
                        contentEditable={false}
                        {...register("offer")}
                        className={`${
                          errors.offer ? "border-red-500" : "mb-3"
                        }`}
                      />
                      {errors.offer && (
                        <p className="text-red-500">{errors.offer.message}</p>
                      )}

                      <Label>Ano</Label>
                      <Input
                        contentEditable={false}
                        value={product?.yearCar}
                        {...register("yearCar")}
                      />

                      <Label>Marca</Label>
                      <Input
                        contentEditable={false}
                        value={product?.brandName}
                        {...register("brand")}
                      />

                      <Label>Metódo de pagamento</Label>
                      <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={`${
                                errors?.paymentMethod ? "border-red-500" : ""
                              }`}
                            >
                              <SelectValue placeholder="Selecione a forma de pagamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem key="credit" value="credit">
                                  Cartão de credito
                                </SelectItem>
                                <SelectItem key="pix" value="pix">
                                  Pix
                                </SelectItem>
                                <SelectItem key="cash" value="cash">
                                  Dinheiro
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.paymentMethod && (
                        <p className="text-red-500">
                          {errors.paymentMethod.message}
                        </p>
                      )}

                      <div className="mt-3">
                        <Label>Detalhes ou observações</Label>
                        <Textarea
                          contentEditable={false}
                          value={product?.details}
                          {...register("details")}
                          className="resize-none"
                        />
                      </div>
                      <DialogFooter className="mt-9">
                        <DialogClose asChild>
                          <Button type="button" variant={"outline"}>
                            Cancelar
                          </Button>
                        </DialogClose>
                        <Button type="submit">Realizar pedido</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <ul className="flex flex-col gap-1 mt-8">
                  <li className="flex items-center gap-3">
                    <Truck size={19} className="text-zinc-500" />
                    <span>Realizamos entrega rapida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Wrench size={19} className="text-zinc-500" />
                    <span>Primeira revisão realizada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <NotepadText size={19} className="text-zinc-500" />
                    <span>Sem burocracia para você</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
