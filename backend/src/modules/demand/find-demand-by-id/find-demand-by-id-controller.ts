import { Request, Response } from "express";
import { MakeFindDemandByIdUseCase } from "../../../factories/make-find-demand-by-id-use-case";

export class FindDemandByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findDemandByIdUseCase = MakeFindDemandByIdUseCase();

    const demand = await findDemandByIdUseCase.execute({
      id,
    });

    return response.json(demand);
  }
}
