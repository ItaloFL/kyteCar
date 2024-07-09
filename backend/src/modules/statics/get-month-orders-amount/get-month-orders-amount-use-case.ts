<<<<<<< HEAD
import { subDays } from "date-fns";

import {
  GetMonthOrdersResponse,
  HistoryRepository,
} from "../../../repositories/history.repository";

interface GetMonthOrdersAmountResponse {
  monthOrders: GetMonthOrdersResponse[];
  monthOrdersAmount: number;
}

export class GetMonthOrdersAmountUseCase {
  constructor(private historyRepository: HistoryRepository) {}

  async execute(): Promise<GetMonthOrdersAmountResponse> {
    const today = new Date();
    const periodMonth = subDays(today, 30);

    const monthOrders = await this.historyRepository.getMonthOrders();

    const monthOrdersAmount = await this.historyRepository.getMonthOrdersAmount(
      today,
      periodMonth
    );
=======
import { endOfDay, parseISO, startOfDay, subDays } from "date-fns";
import { prisma } from "../../../prisma/client";

export class GetMonthOrdersAmountUseCase {
  async execute() {
    const today = new Date();
    const periodMonth = subDays(today, 30);

    const monthOrders = await prisma.history.findMany({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: startOfDay(periodMonth),
          lte: endOfDay(today),
        },
      },
      select: {
        id: true,
        offer: true,
        createdAt: true,
      },
     
    });

    const monthOrdersAmount = await prisma.history.count({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: startOfDay(periodMonth),
          lte: endOfDay(today),
        },
      },
    });
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return { monthOrders, monthOrdersAmount };
  }
}
