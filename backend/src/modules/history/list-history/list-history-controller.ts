import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeListHistoryUseCase } from "../../../factories/make-list-history-use-case";
=======
import { ListHistoryUseCase } from "./list-history-usecase";
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class ListHistoryController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

<<<<<<< HEAD
    const listHistoryUseCase = MakeListHistoryUseCase();

    const histories = await listHistoryUseCase.execute({ pageNumber });
=======
    const listHistoryUseCase = new ListHistoryUseCase();

    const histories = await listHistoryUseCase.execute(pageNumber);
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return response.json(histories);
  }
}
