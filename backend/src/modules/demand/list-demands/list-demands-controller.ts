import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeListDemandsUseCase } from "../../../factories/make-list-demands-use-case";

export class ListDemandsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

    const listDemandsUseCase = MakeListDemandsUseCase();

    const demands = await listDemandsUseCase.execute({
      pageNumber,
    });
=======
import { ListDemandsUseCase } from "./list-demands-usecase";

export class ListDemandsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query

    const pageNumber = parseInt(page as string)

    const listDemandsUseCase = new ListDemandsUseCase();

    const demands = await listDemandsUseCase.execute(pageNumber);
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return response.json(demands);
  }
}
