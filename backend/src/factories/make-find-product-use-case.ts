import { FindProductUseCase } from "../modules/product/find-product/find-product-usecase";
import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository";

export function MakeFindProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const findProductUseCase = new FindProductUseCase(productRepository);

  return findProductUseCase
}
