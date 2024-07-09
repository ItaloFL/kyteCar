import { Demand, Prisma } from "@prisma/client";
import { DemandRepository } from "../demand-repository";
import { randomUUID } from "node:crypto";

export class InMemoryDemandRepository implements DemandRepository {
  data: Demand[] = [];

  async create(data: Prisma.DemandUncheckedCreateInput) {
    const demand = {
      id: data.id ?? randomUUID(),
      name: data.name,
      price: data.price,
      offer: data.offer,
      yearCar: data.yearCar,
      brandName: data.brandName,
      productId: data.productId,
      paymentMethod: data.paymentMethod,
      createdAt: new Date(),
    };

    this.data.push(demand);

    return demand;
  }

  async findById(id: string) {
    const demand = this.data.find((item) => item.id === id);

    if (!demand) return null;

    return demand;
  }

  async findMany(pageNumber: number) {
    return this.data.slice((pageNumber - 1) * pageNumber * 10);
  }

  async count() {
    return this.data.length;
  }
}
