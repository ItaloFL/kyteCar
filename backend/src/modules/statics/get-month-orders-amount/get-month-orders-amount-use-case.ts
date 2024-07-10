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
      periodMonth,
      today
    );

    return { monthOrders, monthOrdersAmount };
  }
}
