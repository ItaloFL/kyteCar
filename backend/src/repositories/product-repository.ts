import { Prisma, Product } from "@prisma/client";

export interface ProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
  findMany(search: string, pageNumber: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  count(search: string): Promise<number>;
  listMany(pageNumber: number): Promise<Product[]>;
  listCount(): Promise<number>;
}
