<<<<<<< HEAD
import { Product } from "@prisma/client";
import { ProductRepository } from "../../../repositories/product-repository";

interface ListProductRequest {
  pageNumber: number;
}

type ListProductResponse = {
  products: Product[];
  totalProducts: number;
};

export class ListProductsUseCase {
  constructor(private productRespository: ProductRepository) {}

  async execute({
    pageNumber,
  }: ListProductRequest): Promise<ListProductResponse> {
    const products = await this.productRespository.listMany(pageNumber);

    const totalProducts = await this.productRespository.listCount();
=======
import { prisma } from "../../../prisma/client";

export class ListProductsUseCase {
  async execute(pageNumber: number) {
    const products = await prisma.product.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalProducts = await prisma.product.count();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return { products, totalProducts };
  }
}
