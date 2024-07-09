import { History, Prisma } from "@prisma/client";

export interface GetMonthOrdersResponse {
  id: string;
  offer: number;
  createdAt: Date;
}

export interface HistoryRepository {
  create(data: Prisma.HistoryUncheckedCreateInput): Promise<History>;
  findMany(pageNumber: number): Promise<History[]>;
  count(): Promise<any>;
  getMonthOrders(): Promise<GetMonthOrdersResponse[]>;
  getMonthOrdersAmount(initialDate: any, finalDate: any): Promise<number>;
  getTodayOrdersQuantity(todayDate: any): Promise<number>;
  getStaticRangeDate(
    initialDate: any,
    finalDate: any
  ): Promise<GetMonthOrdersResponse[]>;
}
