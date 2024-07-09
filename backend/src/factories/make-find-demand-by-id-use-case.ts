import { FindDemandByIdUseCase } from "../modules/demand/find-demand-by-id/find-demand-by-id-usecase";
import { PrismaDemandRepository } from "../repositories/prisma/prisma-demand-repository";

export function MakeFindDemandByIdUseCase() {
  const demandRepository = new PrismaDemandRepository();
  const findDemandByIdUseCase = new FindDemandByIdUseCase(demandRepository);

  return findDemandByIdUseCase;
}
