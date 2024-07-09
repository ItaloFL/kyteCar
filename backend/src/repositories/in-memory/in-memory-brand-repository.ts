import { Brand, Prisma } from "@prisma/client";
import { BrandRepository } from "../brand-repository";
import { randomUUID } from "node:crypto";

export class InMemoryBrandRepostory implements BrandRepository {
  data: Brand[] = [];

  async create(data: Prisma.BrandCreateInput) {
    const brand = {
      id: data.id ?? randomUUID(),
      name: data.name,
    };

    this.data.push(brand);

    return brand;
  }
  async findByName(name: string) {
    const brand = this.data.find((item) => item.name === name);

    if (!brand) {
      return null;
    }

    return brand;
  }
  async findMany() {
    return this.data;
  }
}
