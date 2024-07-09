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
  }
}
