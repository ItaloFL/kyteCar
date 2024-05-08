import { Request, Response } from "express";
import { ListHistoryUseCase } from "./list-history-usecase";

export class ListHistoryController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

    const listHistoryUseCase = new ListHistoryUseCase();

    const histories = await listHistoryUseCase.execute(pageNumber);

    return response.json(histories);
  }
}
