import { prisma } from "../../../prisma/client";

export class ListDemandsUseCase {
  async execute(pageNumber: number) {
    const demands = await prisma.demand.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalDemands = await prisma.demand.count();

    return { demands, totalDemands };
  }
}
