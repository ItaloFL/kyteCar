import { CirclePlus, Filter, Search } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { ProductSkeleton } from "../components/skeletons/products-skeleton";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

interface Product {
  id: string;
  name: string;
  price: number;
  yearCar: string;
  details: string;
  imageURL: string;
  brand: string;
}

interface Brand {
  id: string;
  name: string;
}

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const createProductType = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(40, "O nome não pode ultrapassar 40 caracteres"),
  price: z.string().min(4, "Preço não aceito, forneça um preço válido"),
  yearCar: z.string().refine((value) => {
    const yearCarNumber = parseInt(value);
    return yearCarNumber >= 1995 && yearCarNumber <= 2024;
  }, "Forneça um ano valido entre 1995 e 2024"),
  details: z.string().min(2, "Forneça detalhes do automóvel"),
  imageURL: z
    .custom<FileList>()
    .refine((files) => files?.length >= 1, {
      message: "É obrigatório uma imagem.",
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Apenas arquivos .jpg, .jpeg, .png and .webp são aceitos.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Só são aceitos arquivos até 10MB.`,
    }),
  brand: z.string().min(1, "Escolha uma marca de automóvel"),
});

interface listProductsResponse {
  products: Product[];
  totalProducts: number;
}

interface listSearchProductsResponse {
  products: Product[];
  totalSearchProducts: number;
}

interface listAllBrandsReponse {
  brands: Brand[]
}

type CreateProductType = z.infer<typeof createProductType>;

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchCar, setSearchCar] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateProductType>({
    resolver: zodResolver(createProductType),
  });

  async function getAllProducts() {
    const response = await api.get<listProductsResponse>(
      `products?page=${page}`
    );
    setLoading(true);


    await new Promise((resolve) => setTimeout(resolve, 1500));

    setProducts(response.data.products);
    setTotalPages(Math.ceil(response.data.totalProducts / 10));
    setLoading(false);
  }

  async function getAllBrands() {
    const response = await api.get<listAllBrandsReponse>("brand");
 
    setBrands(response.data.brands)
  }

  async function handleSubmitCreateANewProduct(data: CreateProductType) {
    const { name, price, brand, details, yearCar, imageURL } = data;
 

    await api.post(
      "products",
      {
        name,
        price,
        brand,
        details,
        yearCar,
        imageURL: imageURL[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setOpen(false);
    reset();

    await new Promise((resolve) => setTimeout(resolve, 700));

    toast({
      title: "Produto criado!",
      description: `O produto foi criado com sucesso`,
      variant: "sucess",
      className: "h-[95px]",
      action: (
        <ToastAction className="w-[70px]" altText="Goto schedule to undo">
          Ver
        </ToastAction>
      ),
    });

    getAllProducts();
  }

  async function handleSubmitSearchProduct(searchCar: string) {
    const response = await api.get<listSearchProductsResponse>(
      `product?search=${searchCar}&page=${page}`
    );
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setProducts(response.data.products);
    setTotalPages(Math.ceil(response.data.totalSearchProducts / 12));
    setLoading(false);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  useEffect(() => {
    getAllProducts();
    getAllBrands();
  }, [page]);

  useEffect(() => {}, [products]);

  return (
    <div className="bg-slate-200 p-16">
      <div className="bg-slate-50 h-full rounded-md p-14">
        <div className="flex justify-center gap-10 mb-9">
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              handleSubmitSearchProduct(searchCar);
            }}
            className="flex items-center justify-center gap-24"
          >
            <Input
              type="text"
              name="search"
              className="border w-[250px] h-[40px] p-3 rounded-md"
              placeholder="Nome do produto"
              onChange={(e: any) => {
                setSearchCar(e.target.value);
              }}
            />

            <Button
              className="flex items-center gap-2 justify-center border p-1 w-[120px] rounded-md h-[40px] font-semibold"
              variant={"secondary"}
              type="submit"
            >
              <Search width={16} />
              Pesquisar
            </Button>
          </form>
          <div className="flex items-center gap-[120px]">
            <div className="flex items-center gap-6">
              <Button
                className="flex items-center gap-2 justify-center border p-1 w-[120px] rounded-md h-[40px] font-semibold"
                variant={"secondary"}
              >
                <Filter width={16} />
                Filtros
              </Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 justify-center border p-1 w-[180px] rounded-md h-[40px] font-semibold bg-slate-600 text-white">
                  <CirclePlus width={16} color="white" />
                  Adicionar produto
                </button>
              </DialogTrigger>

              <DialogContent className="min-h-[660px]">
                <DialogHeader>
                  <DialogTitle>Novo produto</DialogTitle>
                  <DialogDescription>
                    Criar um novo produto no sistema
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleSubmitCreateANewProduct)}>
                  <Label>Imagem</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {selectedFile ? (
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          {selectedFile.name}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Clique</span> e faça
                            upload da sua imagem
                          </p>
                        </div>
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        {...register("imageURL")}
                        className="opacity-0"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {errors.imageURL && (
                    <p className="text-red-500">{errors.imageURL.message}</p>
                  )}
                  <Label>Nome</Label>
                  <Input
                    className={`${errors.name ? "border-red-500" : "mb-3"}`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                  <Label>Preço</Label>
                  <Input
                    type="number"
                    className={` ${errors.price ? "border-red-500" : "mb-3"} `}
                    {...register("price")}
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                  <Label>Ano</Label>
                  <Input
                    type="number"
                    className={` ${errors.yearCar ? "border-red-500" : "mb-3"}`}
                    {...register("yearCar")}
                  />
                  {errors.yearCar && (
                    <p className="text-red-500">{errors.yearCar.message}</p>
                  )}
                  <Label>Marca</Label>
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={` ${
                            errors.brand ? "border-red-500" : "mb-3"
                          }`}
                        >
                          <SelectValue
                            placeholder="Selecione a marca do seu carro"
                            onBlur={field.onBlur}
                            ref={field.ref}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {brands.map((brand: Brand) => (
                              <SelectItem key={brand.id} value={brand.name}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.brand && (
                    <p className="text-red-500">{errors.brand.message}</p>
                  )}
                  <div className="mt-3">
                    <Label>Detalhes ou observações</Label>
                    <Textarea
                      className={`resize-none ${
                        errors.details ? "border-red-500" : "mb-3"
                      }`}
                      {...register("details")}
                    />
                    {errors.details && (
                      <p className="text-red-500">{errors.details.message}</p>
                    )}
                  </div>
                  <DialogFooter className="mt-9">
                    <DialogClose asChild>
                      <Button type="button" variant={"outline"}>
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="submit">Criar produto</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-7 justify-center items-center">
          {loading ? (
            <div className="flex flex-wrap justify-center gap-6 gap-y-16 min-h-[565px]">
              {[...Array(10)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 gap-y-16 min-h-[565px]">
              {products.map((product: Product) => {
                return (
                  <div
                    className="bg-zinc-200 h-[240px] w-[210px] rounded"
                    key={product.id}
                  >
                    <img
                      src={product.imageURL}
                      className="h-[130px] w-full object-cover rounded"
                    />
                    <div className="flex flex-col justify-center items-center gap-8">
                      <p className="mt-2 font-semibold text-base">
                        {product.name}
                      </p>
                      <div className="flex items-center justify-center gap-5">
                        <p className="font-semibold text-base">
                          R$ {product.price.toLocaleString("pt-BR")}
                        </p>
                        <Link to={`/product/${product.id}`}>
                          <Button className="flex items-center gap-2">
                            Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Pagination className="mt-3">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
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
    </div>
  );
}
