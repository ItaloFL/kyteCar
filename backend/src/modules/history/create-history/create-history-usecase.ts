import { History } from "@prisma/client";
import { HistoryRepository } from "../../../repositories/history.repository";

interface CreateHistoryResquest {
  productId: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
  brandName: string;
  hasAccepted: boolean;
}

type CreateHistoryResponse = {
  history: History;
};

export class CreateHistoryUseCase {
  constructor(private historyRepository: HistoryRepository) {}

  async execute({
    name,
    price,
    yearCar,
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
  }
}
