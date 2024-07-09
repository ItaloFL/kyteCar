import { Product } from "@prisma/client";
import { AppError } from "../../../errors/AppError/AppError";
import { ProductRepository } from "../../../repositories/product-repository";

interface FindProductRequest {
  pageNumber: number;
  search: string;
}

type FindProductResponse = {
  products: Product[];
  totalSearchProducts: number;
};

export class FindProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    search,
    pageNumber = 1,
  }: FindProductRequest): Promise<FindProductResponse> {
    const products = await this.productRepository.findMany(search, pageNumber);

    const totalSearchProducts = await this.productRepository.count(search);

    if (!products) throw new AppError("This product not found");

    return { products, totalSearchProducts };
  }
}
