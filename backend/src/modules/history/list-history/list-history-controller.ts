import { Request, Response } from "express";
import { MakeListHistoryUseCase } from "../../../factories/make-list-history-use-case";

export class ListHistoryController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

    const listHistoryUseCase = MakeListHistoryUseCase();

    const histories = await listHistoryUseCase.execute({ pageNumber });

    return response.json(histories);
  }
}
