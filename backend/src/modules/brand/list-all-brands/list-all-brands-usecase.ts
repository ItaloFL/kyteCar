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
  }
}
