import { CreateBrandUseCase } from "../modules/brand/create-brand/create-brand-usecase";
import { PrismaBrandRepository } from "../repositories/prisma/prisma-brand-repository";

export function MakeCreateBrandUseCase() {
  const brandRepository = new PrismaBrandRepository();
  const createBrandUseCase = new CreateBrandUseCase(brandRepository);

  return createBrandUseCase;
}
