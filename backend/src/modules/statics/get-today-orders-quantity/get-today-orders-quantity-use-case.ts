<<<<<<< HEAD
import { HistoryRepository } from "../../../repositories/history.repository";

type GetTodayOrdersQuantityResponse = {
  totalOrdersToday: number;
};

export class GetTodayOrdersQuantityUseCase {
  constructor(private historyRepository: HistoryRepository) {}

  async execute(todayDate: any) {
    const totalOrdersToday =
      await this.historyRepository.getTodayOrdersQuantity(todayDate);

    return { totalOrdersToday };
=======
import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../../../prisma/client";

export class GetTodayOrdersQuantityUseCase {
  async execute() {
    const today = new Date();

    const totalOrdersToday = await prisma.history.count({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
    });

    return totalOrdersToday;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
