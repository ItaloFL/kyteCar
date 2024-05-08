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
  }
}
