import { prisma } from "../../../prisma/client";

export class ListAllBrandsUseCase {
  async execute() {
    const brands = await prisma.brand.findMany();

    return brands;
  }
}
