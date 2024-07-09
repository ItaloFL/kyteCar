import { History } from "@prisma/client";
import { HistoryRepository } from "../../../repositories/history.repository";

interface ListHistoryRequest {
  pageNumber: number;
}

type ListHistoryResponse = {
  histories: History[];
  totalHistories: number;
};

export class ListHistoryUseCase {
  constructor(private historyRepository: HistoryRepository) {}

  async execute({
    pageNumber,
  }: ListHistoryRequest): Promise<ListHistoryResponse> {
    const histories = await this.historyRepository.findMany(pageNumber);

    const totalHistories = await this.historyRepository.count()

    return { histories, totalHistories };
  }
}
