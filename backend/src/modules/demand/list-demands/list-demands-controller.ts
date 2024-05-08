import { Request, Response } from "express";
import { ListDemandsUseCase } from "./list-demands-usecase";

export class ListDemandsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query

    const pageNumber = parseInt(page as string)

    const listDemandsUseCase = new ListDemandsUseCase();

    const demands = await listDemandsUseCase.execute(pageNumber);

    return response.json(demands);
  }
}
