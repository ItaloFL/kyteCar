<<<<<<< HEAD
import { Product } from "@prisma/client";
import { AppError } from "../../../errors/AppError/AppError";
import { ProductRepository } from "../../../repositories/product-repository";

interface FindProductRequest {
=======
import { AppError } from "../../../errors/AppError/AppError";
import { prisma } from "../../../prisma/client";

interface ListProductType {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  pageNumber: number;
  search: string;
}

<<<<<<< HEAD
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
=======
export class FindProductUseCase {
  async execute({ search, pageNumber }: ListProductType) {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalSearchProducts = await prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    if (!products) throw new AppError("This product not found");

    return { products, totalSearchProducts };
  }
}
