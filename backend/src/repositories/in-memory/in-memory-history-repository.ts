import { History, Prisma } from "@prisma/client";
import {
  GetMonthOrdersResponse,
  HistoryRepository,
} from "../history.repository";
import { randomUUID } from "node:crypto";
import { endOfDay, startOfDay, subDays } from "date-fns";
import dayjs from "dayjs";

export class InMemoryHistoryRepository implements HistoryRepository {
  data: History[] = [];

  async create(data: Prisma.HistoryUncheckedCreateInput) {
    const history = {
      id: data.id ?? randomUUID(),
      name: data.name,
      price: data.price,
      offer: data.offer,
      yearCar: data.yearCar,
      brandName: data.brandName,
      hasAccepted: data.hasAccepted,
      productId: data.productId,
      createdAt: new Date(),
    };

    this.data.push(history);

    return history;
  }

  async findMany(pageNumber: number) {
    return this.data.slice((pageNumber - 1) * pageNumber * 10);
  }

  async count() {
    return this.data.length;
  }

  async getMonthOrders(): Promise<GetMonthOrdersResponse[]> {
    const date = new Date();
    const initialRange = subDays(date, 31);

    const initialRangeDate = dayjs(initialRange).startOf("date");
    const endRangeDate = dayjs(date).endOf("date");

    const getMonthOrders = this.data.filter((item) => {
      const historyDate = dayjs(item.createdAt);
      const isOnRangeDate =
        historyDate.isAfter(initialRangeDate) &&
        historyDate.isBefore(endRangeDate);

      return item.hasAccepted && isOnRangeDate;
    });

    return getMonthOrders;
  }

  async getMonthOrdersAmount(
    initialDate: any,
    finalDate: any
  ): Promise<number> {
    const initialRangeDate = dayjs(finalDate).endOf("date");
    const endRangeDate = dayjs(initialDate).endOf("date");

    const getMonthOrdersAmount = this.data.filter((item) => {
      const historyDate = dayjs(item.createdAt);
      const isOnRangeDate =
        historyDate.isAfter(endRangeDate) &&
        historyDate.isBefore(initialRangeDate);

      return item.hasAccepted && isOnRangeDate;
    }).length;

    return getMonthOrdersAmount;
  }

  async getTodayOrdersQuantity(todayDay: any): Promise<number> {
    const getMonthOrdersAmount = this.data.filter((item) => {
      return (
        item.hasAccepted &&
        item.createdAt >= startOfDay(todayDay) &&
        item.createdAt <= endOfDay(todayDay)
      );
    }).length;

    return getMonthOrdersAmount;
  }

  async getStaticRangeDate(initialDate: any, finalDate: any) {
    const getMonthOrdersAmount = this.data.filter((item) => {
      return (
        item.hasAccepted &&
        item.createdAt >= startOfDay(initialDate) &&
        item.createdAt <= endOfDay(finalDate)
      );
    });

    return getMonthOrdersAmount;
  }
}
