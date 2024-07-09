import { CreateHistoryUseCase } from "../modules/history/create-history/create-history-usecase";
import { PrismaHistoryRepository } from "../repositories/prisma/prisma-history-repository";

export function MakeCreateHistoryUseCase() {
  const historyRepository = new PrismaHistoryRepository();
  const createHistoryUseCase = new CreateHistoryUseCase(historyRepository);

  return createHistoryUseCase;
}
