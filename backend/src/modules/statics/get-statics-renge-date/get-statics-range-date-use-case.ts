import { AppError } from "../../../errors/AppError/AppError";
<<<<<<< HEAD
import {
  startOfDay,
  endOfDay,
  format,
  eachDayOfInterval,
  differenceInDays,
  parseISO,
} from "date-fns";
import { HistoryRepository } from "../../../repositories/history.repository";

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
    const finalDateDate = new Date(finalDate);
=======
import { prisma } from "../../../prisma/client";
import {
  startOfDay,
  endOfDay,
  parseISO,
  format,
  eachDayOfInterval,
  differenceInDays,
} from "date-fns";

export class GetStaticsRangeDateUseCase {
  async execute(initialDate: any, finalDate: any) {
    const dataInicialDate = parseISO(initialDate);
    const dataFinalDate = parseISO(finalDate);

    const initialDateAll = startOfDay(dataInicialDate);
    const finalDateAll = endOfDay(dataFinalDate);
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    if (differenceInDays(finalDate, initialDate) > 6) {
      throw new AppError("The difference into datas does not be more than 7");
    }

<<<<<<< HEAD
    const productAcceptedIntoRangeData =
      await this.historyRepository.getStaticRangeDate(
        initialDateDate,
        finalDateDate
      );
=======
    const productAcceptedIntoRangeData = await prisma.history.findMany({
      where: {
        hasAccepted: true,
        createdAt: {
          gte: new Date(initialDateAll),
          lte: new Date(finalDateAll),
        },
      },
      select: {
        id: true,
        offer: true,
        createdAt: true,
      },
    });
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const dailyOffers: { [date: string]: number } = {};

    productAcceptedIntoRangeData.forEach((item) => {
      const date = format(item.createdAt, "dd/MM/yyyy");
      dailyOffers[date] = (dailyOffers[date] || 0) + item.offer;
    });

    const allDates = eachDayOfInterval({
<<<<<<< HEAD
      start: parseISO(initialDate),
      end: parseISO(finalDate),
=======
      start: initialDateAll,
      end: finalDateAll,
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
    });

    const result = allDates.map((date) => {
      const formattedDate = format(date, "dd/MM/yyyy");
      return {
        date: formattedDate,
        offer: dailyOffers[formattedDate] || 0,
      };
    });

<<<<<<< HEAD
    return { result };
=======
    return result;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
