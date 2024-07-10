import { Prisma } from "@prisma/client";
import { BrandRepository } from "../brand-repository";
import { prisma } from "../../prisma/client";

export class PrismaBrandRepository implements BrandRepository {
  async create({ name }: Prisma.BrandCreateInput) {
   
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    return brand;
  }

  async findByName(name: string) {
    const brand = await prisma.brand.findFirst({
      where: {
        name,
      },
    });

    return brand;
  }

  async findMany() {
    const brands = await prisma.brand.findMany();

    return brands;
  }
}
