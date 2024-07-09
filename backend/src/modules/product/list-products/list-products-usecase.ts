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

    return { products, totalProducts };
  }
}
