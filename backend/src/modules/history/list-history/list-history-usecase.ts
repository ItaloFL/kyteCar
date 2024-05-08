import { prisma } from "../../../prisma/client";

export class ListHistoryUseCase {
  async execute(pageNumber: number) {
    const histories = await prisma.history.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalHistories = await prisma.history.count();

    return { histories, totalHistories };
  }
}
