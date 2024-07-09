<<<<<<< HEAD
import { Demand } from "@prisma/client";
import { DemandRepository } from "../../../repositories/demand-repository";

interface ListDemandRequest {
  pageNumber: number;
}

type ListDemandReponse = {
  demands: Demand[];
  totalDemands: number;
};
export class ListDemandsUseCase {
  constructor(private demandRepository: DemandRepository) {}

  async execute({ pageNumber }: ListDemandRequest): Promise<ListDemandReponse> {
    const demands = await this.demandRepository.findMany(pageNumber);

    const totalDemands = await this.demandRepository.count();
=======
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
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return { demands, totalDemands };
  }
}
