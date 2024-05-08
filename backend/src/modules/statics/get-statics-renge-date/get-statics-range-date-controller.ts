import { Request, Response } from "express";
import { GetStaticsRangeDateUseCase } from "./get-statics-range-date-use-case";

export class GetStaticsRangeDateController {
  async handle(request: Request, response: Response) {
    const { initialDate, finalDate } = request.query;

    const getStaticsRangeDateUseCase = new GetStaticsRangeDateUseCase();

    const statics = await getStaticsRangeDateUseCase.execute(
      initialDate,
      finalDate
    );
    return response.json(statics);
  }
}
