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

    return { monthOrders, monthOrdersAmount };
  }
}
