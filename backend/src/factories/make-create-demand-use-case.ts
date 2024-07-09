import { CreateDemandUseCase } from "../modules/demand/create-demand/create-demand-usecase";
import { PrismaBrandRepository } from "../repositories/prisma/prisma-brand-repository";
import { PrismaDemandRepository } from "../repositories/prisma/prisma-demand-repository";
import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository";

export function MakeCreateDemandUseCase() {
  const demandRepository = new PrismaDemandRepository();
  const brandRepository = new PrismaBrandRepository();
  const productRepository = new PrismaProductRepository();
  const createDemandUseCase = new CreateDemandUseCase(
    demandRepository,
    brandRepository,
    productRepository
  );

  return createDemandUseCase;
}
