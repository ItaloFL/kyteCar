import { Brand, Prisma } from "@prisma/client";

export interface BrandRepository {
  create(data: Prisma.BrandCreateInput): Promise<Brand>;
  findByName(name: string): Promise<Brand | null>;
  findMany(): Promise<Brand[]>;
}
