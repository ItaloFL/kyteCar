import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeGetStaticsRangeDateUseCase } from "../../../factories/make-get-statics-range-date-use-case";
=======
import { GetStaticsRangeDateUseCase } from "./get-statics-range-date-use-case";
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class GetStaticsRangeDateController {
  async handle(request: Request, response: Response) {
    const { initialDate, finalDate } = request.query;

<<<<<<< HEAD
    const getStaticsRangeDateUseCase = MakeGetStaticsRangeDateUseCase();

    const statics = await getStaticsRangeDateUseCase.execute({
      initialDate,
      finalDate,
    });
=======
    const getStaticsRangeDateUseCase = new GetStaticsRangeDateUseCase();

    const statics = await getStaticsRangeDateUseCase.execute(
      initialDate,
      finalDate
    );
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
    return response.json(statics);
  }
}
