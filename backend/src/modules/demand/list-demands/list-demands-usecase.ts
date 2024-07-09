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

    return { demands, totalDemands };
  }
}
