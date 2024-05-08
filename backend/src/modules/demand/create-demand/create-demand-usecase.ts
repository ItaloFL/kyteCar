import { prisma } from "../../../prisma/client";

interface DemandType {
  productId: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
  brand: string;
  paymentMethod: "cash" | "credit" | "pix";
}

export class CreateDemandUseCase {
  async execute({
    name,
    price,
    offer,
    yearCar,
    brand,
    productId,
    paymentMethod,
  }: DemandType) {
    const demand = await prisma.demand.create({
      data: {
        name,
        price,
        offer,
        yearCar,
        brandName: brand,
        paymentMethod,
        productId
      },
    });

    return demand;
  }
}
