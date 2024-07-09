import { FindProductByIdUseCase } from "../modules/product/find-product-by-id/find-product-by-id-usecase";
import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository";

export function MakeFindProductByIdUseCase() {
  const productRepository = new PrismaProductRepository();
  const findProductByIdUseCase = new FindProductByIdUseCase(productRepository);

  return findProductByIdUseCase;
}
