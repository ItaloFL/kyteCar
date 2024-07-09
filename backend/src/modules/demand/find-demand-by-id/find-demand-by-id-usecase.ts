import { Demand } from "@prisma/client";
import { DemandRepository } from "../../../repositories/demand-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface FindDemandByIdRequest {
  id: string;
}

type FindDemandByIdResponse = {
  demand: Demand;
};

export class FindDemandByIdUseCase {
  constructor(private demandRepository: DemandRepository) {}

  async execute({
    id,
  }: FindDemandByIdRequest): Promise<FindDemandByIdResponse> {
    const demand = await this.demandRepository.findById(id);

    if (!demand) throw new AppError("Demand does not exist");

    return { demand };
  }
}
