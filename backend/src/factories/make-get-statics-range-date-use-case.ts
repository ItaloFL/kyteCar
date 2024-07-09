import { GetStaticsRangeDateUseCase } from "../modules/statics/get-statics-renge-date/get-statics-range-date-use-case";
import { PrismaHistoryRepository } from "../repositories/prisma/prisma-history-repository";

export function MakeGetStaticsRangeDateUseCase() {
  const historyRepository = new PrismaHistoryRepository();
  const getStaticsRangeDateUseCase = new GetStaticsRangeDateUseCase(
    historyRepository
  );

  return getStaticsRangeDateUseCase;
}
