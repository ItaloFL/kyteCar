<<<<<<< HEAD
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
=======
import { prisma } from "../../../prisma/client";

export class ListHistoryUseCase {
  async execute(pageNumber: number) {
    const histories = await prisma.history.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalHistories = await prisma.history.count();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return { histories, totalHistories };
  }
}
