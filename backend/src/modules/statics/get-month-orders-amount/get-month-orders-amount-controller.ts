import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeGetMonthOrdersAmountUseCase } from "../../../factories/make-get-month-orders-amount-use-case";

export class GetMonthOrdersAmountController {
  async handle(request: Request, response: Response) {
    const getMonthOrdersAmount = MakeGetMonthOrdersAmountUseCase();
=======
import { GetMonthOrdersAmountUseCase } from "./get-month-orders-amount-use-case";

export class GetMonthOrdersAmountController {
  async handle(request: Request, response: Response) {
    const getMonthOrdersAmount = new GetMonthOrdersAmountUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const monthOrdersAmount = await getMonthOrdersAmount.execute();

    return response.json(monthOrdersAmount);
  }
}
