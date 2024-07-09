import { GetTodayOrdersQuantityUseCase } from "../modules/statics/get-today-orders-quantity/get-today-orders-quantity-use-case";
import { PrismaHistoryRepository } from "../repositories/prisma/prisma-history-repository";

export function MakeGetTodayOrdersQuantityUseCase() {
  const historyRepository = new PrismaHistoryRepository();
  const getTodayOrdersQuantityUseCase = new GetTodayOrdersQuantityUseCase(
    historyRepository
  );

  return getTodayOrdersQuantityUseCase;
}
