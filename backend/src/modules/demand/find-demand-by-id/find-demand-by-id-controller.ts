import { Request, Response } from "express";
import { FindDemandByIdUseCase } from "./find-demand-by-id-usecase";

export class FindDemandByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findDemandByIdUseCase = new FindDemandByIdUseCase();

    const demand = await findDemandByIdUseCase.execute(id);

    return response.json(demand);
  }
}
