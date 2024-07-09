<<<<<<< HEAD
import { Brand } from "@prisma/client";
import { BrandRepository } from "../../../repositories/brand-repository";

type ListAllBrandsResponse = {
  brands: Brand[];
};

export class ListAllBrandsUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(): Promise<ListAllBrandsResponse> {
    const brands = await this.brandRepository.findMany();

    return { brands };
=======
import { prisma } from "../../../prisma/client";

export class ListAllBrandsUseCase {
  async execute() {
    const brands = await prisma.brand.findMany();

    return brands;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
