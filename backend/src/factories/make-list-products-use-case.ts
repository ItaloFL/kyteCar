import { ListProductsUseCase } from "../modules/product/list-products/list-products-usecase";
import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository";

export function MakeListProductsUseCase() {
  const productRepository = new PrismaProductRepository();
  const listProductUseCase = new ListProductsUseCase(productRepository);

  return listProductUseCase;
}
