import { AppError } from "../../../errors/AppError/AppError";
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

    if (differenceInDays(finalDate, initialDate) > 6) {
      throw new AppError("The difference into datas does not be more than 7");
    }

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

    const dailyOffers: { [date: string]: number } = {};

    productAcceptedIntoRangeData.forEach((item) => {
      const date = format(item.createdAt, "dd/MM/yyyy");
      dailyOffers[date] = (dailyOffers[date] || 0) + item.offer;
    });

    const allDates = eachDayOfInterval({
      start: initialDateAll,
      end: finalDateAll,
    });

    const result = allDates.map((date) => {
      const formattedDate = format(date, "dd/MM/yyyy");
      return {
        date: formattedDate,
        offer: dailyOffers[formattedDate] || 0,
      };
    });

    return result;
  }
}
