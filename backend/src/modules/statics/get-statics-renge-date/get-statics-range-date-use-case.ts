import { AppError } from "../../../errors/AppError/AppError";
import {
  startOfDay,
  endOfDay,
  format,
  eachDayOfInterval,
  differenceInDays,
  parseISO,
} from "date-fns";
import { HistoryRepository } from "../../../repositories/history.repository";
import dayjs from "dayjs";

interface GetStaticsRangeDateRequest {
  initialDate: any;
  finalDate: any;
}

type GetStaticRangeDateResponse = {
  result: test[];
};

type test = {
  date: string;
  offer: number;
};

export class GetStaticsRangeDateUseCase {
  constructor(private historyRepository: HistoryRepository) {}

  async execute({
    initialDate,
    finalDate,
  }: GetStaticsRangeDateRequest): Promise<GetStaticRangeDateResponse> {
    const initialDateDate = new Date(initialDate);

    const InitialDate = startOfDay(initialDateDate);
    const FinalDate = endOfDay(parseISO(finalDate));

    if (differenceInDays(finalDate, initialDate) > 6) {
      throw new AppError("The difference into datas does not be more than 7");
    }

    const productAcceptedIntoRangeData =
      await this.historyRepository.getStaticRangeDate(
        InitialDate,
        FinalDate
      );

    const dailyOffers: { [date: string]: number } = {};

    productAcceptedIntoRangeData.forEach((item) => {
      const date = format(item.createdAt, "dd/MM/yyyy");
      dailyOffers[date] = (dailyOffers[date] || 0) + item.offer;
    });

    const allDates = eachDayOfInterval({
      start: parseISO(initialDate),
      end: parseISO(finalDate),
    });

    const result = allDates.map((date) => {
      const formattedDate = format(date, "dd/MM/yyyy");
      return {
        date: formattedDate,
        offer: dailyOffers[formattedDate] || 0,
      };
    });

    return { result };
  }
}
