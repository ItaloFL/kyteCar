import { Request, Response } from "express";
import { MakeGetStaticsRangeDateUseCase } from "../../../factories/make-get-statics-range-date-use-case";

export class GetStaticsRangeDateController {
  async handle(request: Request, response: Response) {
    const { initialDate, finalDate } = request.query;

    const getStaticsRangeDateUseCase = MakeGetStaticsRangeDateUseCase();

    const statics = await getStaticsRangeDateUseCase.execute({
      initialDate,
      finalDate,
    });
    return response.json(statics);
  }
}
