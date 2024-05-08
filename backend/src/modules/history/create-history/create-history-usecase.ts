import { prisma } from "../../../prisma/client";

interface HistoryType {
  productId: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
  brand: string;
  hasAccepted: boolean;
}

export class CreateHistoryUseCase {
  async execute({
    name,
    price,
    yearCar,
    brand,
    hasAccepted,
    offer,
    productId,
  }: HistoryType) {

    const history = await prisma.history.create({
      data: {
        name,
        price,
        yearCar,
        brandName: brand,
        hasAccepted,
        offer,
        productId,
      },
    });

    return history;
  }
}
