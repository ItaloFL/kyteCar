import { Demand, Prisma } from "@prisma/client";

export interface DemandRepository {
  create(data: Prisma.DemandUncheckedCreateInput): Promise<Demand>;
  findById(id: string): Promise<Demand | null>;
  findMany(pageNumber: number): Promise<Demand[]>;
  count(): Promise<number>;
}
