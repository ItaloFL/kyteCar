import { prisma } from "../../../prisma/client";

export class FindDemandByIdUseCase {
  async execute(id: string) {
    const demand = await prisma.demand.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        yearCar: true,
        price: true,
        offer: true,
        brandName: true,
        paymentMethod: true,
        product: {
          select: {
            id: true,
            imageURL: true,
          },
        },
        createdAt: true,
      },
    });

    return demand;
  }
}
