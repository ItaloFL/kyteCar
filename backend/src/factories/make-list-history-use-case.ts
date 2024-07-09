import { ListHistoryUseCase } from "../modules/history/list-history/list-history-usecase";
import { PrismaHistoryRepository } from "../repositories/prisma/prisma-history-repository";



export function MakeListHistoryUseCase(){
  const historyRepository = new PrismaHistoryRepository()
  const listHistoryUseCase = new ListHistoryUseCase(historyRepository)

  return listHistoryUseCase
}