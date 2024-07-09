import { CreateProductUseCase } from "../modules/product/create-product/create-product-usecase";
import { PrismaBrandRepository } from "../repositories/prisma/prisma-brand-repository";
import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository";

export function MakeCreateProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const brandRepository = new PrismaBrandRepository();
  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    brandRepository
  );

  return createProductUseCase;
}
