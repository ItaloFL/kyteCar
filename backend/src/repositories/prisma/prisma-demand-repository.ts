import { Prisma } from "@prisma/client";
import { DemandRepository } from "../demand-repository";
import { prisma } from "../../prisma/client";

export class PrismaDemandRepository implements DemandRepository {
  async create({
    name,
    offer,
    price,
    yearCar,
    brandName,
    paymentMethod,
    productId,
  }: Prisma.DemandUncheckedCreateInput) {
    const demand = await prisma.demand.create({
      data: {
        name,
        price,
        offer,
        yearCar,
        brandName,
        paymentMethod,
        productId,
      },
    });

    return demand;
  }

  async findById(id: string) {
    const demand = await prisma.demand.findFirst({
      where: {
        id,
      },
      include: {
        product: {
          select: {
            id: true,
            imageURL: true,
          },
        },
      },
    });

    return demand;
  }

  async findMany(pageNumber: number) {
    const demands = await prisma.demand.findMany({
      take: 10,
      skip: (pageNumber - 1) * pageNumber * 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return demands;
  }

  async count() {
    const demandsCount = await prisma.demand.count();

    return demandsCount;
  }
}
