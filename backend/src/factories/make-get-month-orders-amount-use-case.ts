import { GetMonthOrdersAmountUseCase } from "../modules/statics/get-month-orders-amount/get-month-orders-amount-use-case";
import { PrismaHistoryRepository } from "../repositories/prisma/prisma-history-repository";

export function MakeGetMonthOrdersAmountUseCase() {
  const historyRepository = new PrismaHistoryRepository();
  const getMonthOrdersAmount = new GetMonthOrdersAmountUseCase(
    historyRepository
  );

  return getMonthOrdersAmount;
}
