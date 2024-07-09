import { Request, Response } from "express";
import { MakeGetMonthOrdersAmountUseCase } from "../../../factories/make-get-month-orders-amount-use-case";

export class GetMonthOrdersAmountController {
  async handle(request: Request, response: Response) {
    const getMonthOrdersAmount = MakeGetMonthOrdersAmountUseCase();

    const monthOrdersAmount = await getMonthOrdersAmount.execute();

    return response.json(monthOrdersAmount);
  }
}
