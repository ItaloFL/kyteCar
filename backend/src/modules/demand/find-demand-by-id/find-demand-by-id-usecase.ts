<<<<<<< HEAD
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
=======
import { prisma } from "../../../prisma/client";

export class FindDemandByIdUseCase {
  async execute(id: string) {
    const demand = await prisma.demand.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        yearCar: true,
        price: true,
        offer: true,
        brandName: true,
        paymentMethod: true,
        product: {
          select: {
            id: true,
            imageURL: true,
          },
        },
        createdAt: true,
      },
    });

    return demand;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
