import { Prisma } from "@prisma/client";
import {
  GetMonthOrdersResponse,
  HistoryRepository,
} from "../history.repository";
import { prisma } from "../../prisma/client";
import { endOfDay, startOfDay, subDays } from "date-fns";

export class PrismaHistoryRepository implements HistoryRepository {
  async create({
    name,
    price,
    yearCar,
    brandName,
    hasAccepted,
    offer,
    productId,
  }: Prisma.HistoryUncheckedCreateInput) {
    const history = await prisma.history.create({
      data: {
        name,
        price,
        yearCar,
        brandName,
        hasAccepted,
        offer,
        productId,
      },
    });

    return history;
  }

  async findMany(pageNumber: number) {
    const histories = await prisma.history.findMany({
      take: 10,
      skip: (pageNumber - 1) * pageNumber * 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return histories;
  }

  async count() {
    const historiesCount = await prisma.history.count();

    return historiesCount;
  }

  async getMonthOrders() {
    const finalDate = new Date();
    const initialDate = subDays(finalDate, 30);

    const monthOrders = await prisma.history.findMany({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: startOfDay(initialDate),
          lte: endOfDay(finalDate),
        },
      },
      select: {
        id: true,
        offer: true,
        createdAt: true,
      },
    });

    return monthOrders;
  }

  async getMonthOrdersAmount(
    initialDate: any,
    finalDate: any
  ): Promise<number> {
    const monthOrdersAmount = await prisma.history.count({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: startOfDay(initialDate),
          lte: endOfDay(finalDate),
        },
      },
    });

    return monthOrdersAmount;
  }

  async getTodayOrdersQuantity() {
    const today = new Date();

    const todayOrdersQuantity = await prisma.history.count({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
    });

    return todayOrdersQuantity;
  }

  async getStaticRangeDate(
    initialDate: any,
    finalDate: any
  ): Promise<GetMonthOrdersResponse[]> {
    const acceptedProductsRangeDate = await prisma.history.findMany({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: initialDate,
          lte: finalDate,
        },
      },
      select: {
        id: true,
        offer: true,
        createdAt: true,
      },
    });

    return acceptedProductsRangeDate;
  }
}
