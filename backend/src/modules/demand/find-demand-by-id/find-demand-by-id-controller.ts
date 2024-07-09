import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeFindDemandByIdUseCase } from "../../../factories/make-find-demand-by-id-use-case";
=======
import { FindDemandByIdUseCase } from "./find-demand-by-id-usecase";
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class FindDemandByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

<<<<<<< HEAD
    const findDemandByIdUseCase = MakeFindDemandByIdUseCase();

    const demand = await findDemandByIdUseCase.execute({
      id,
    });
=======
    const findDemandByIdUseCase = new FindDemandByIdUseCase();

    const demand = await findDemandByIdUseCase.execute(id);
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return response.json(demand);
  }
}
