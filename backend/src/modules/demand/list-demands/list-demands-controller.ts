import { Request, Response } from "express";
import { MakeListDemandsUseCase } from "../../../factories/make-list-demands-use-case";

export class ListDemandsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

    const listDemandsUseCase = MakeListDemandsUseCase();

    const demands = await listDemandsUseCase.execute({
      pageNumber,
    });

    return response.json(demands);
  }
}
