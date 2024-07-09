import { ListAllBrandsUseCase } from "../modules/brand/list-all-brands/list-all-brands-usecase";
import { PrismaBrandRepository } from "../repositories/prisma/prisma-brand-repository";



export function MakeListAllBrandUseCase(){
  const brandRepository = new PrismaBrandRepository()
  const listAllBrandUseCase = new ListAllBrandsUseCase(brandRepository)

  return listAllBrandUseCase
}