import { ListDemandsUseCase } from "../modules/demand/list-demands/list-demands-usecase";
import { PrismaDemandRepository } from "../repositories/prisma/prisma-demand-repository";

export function MakeListDemandsUseCase() {
  const demandsRepository = new PrismaDemandRepository();
  const listDemandsUseCase = new ListDemandsUseCase(demandsRepository);

  return listDemandsUseCase;
}
