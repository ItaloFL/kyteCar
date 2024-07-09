<<<<<<< HEAD
import { History } from "@prisma/client";
import { HistoryRepository } from "../../../repositories/history.repository";

interface CreateHistoryResquest {
=======
import { prisma } from "../../../prisma/client";

interface HistoryType {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  productId: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
<<<<<<< HEAD
  brandName: string;
  hasAccepted: boolean;
}

type CreateHistoryResponse = {
  history: History;
};

export class CreateHistoryUseCase {
  constructor(private historyRepository: HistoryRepository) {}

=======
  brand: string;
  hasAccepted: boolean;
}

export class CreateHistoryUseCase {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  async execute({
    name,
    price,
    yearCar,
<<<<<<< HEAD
    brandName,
    hasAccepted,
    offer,
    productId,
  }: CreateHistoryResquest): Promise<CreateHistoryResponse> {
    const history = await this.historyRepository.create({
      name,
      price,
      yearCar,
      brandName,
      hasAccepted,
      offer,
      productId,
    });

    return { history };
=======
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
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
