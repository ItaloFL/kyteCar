import { Request, Response } from "express";
import { GetMonthOrdersAmountUseCase } from "./get-month-orders-amount-use-case";

export class GetMonthOrdersAmountController {
  async handle(request: Request, response: Response) {
    const getMonthOrdersAmount = new GetMonthOrdersAmountUseCase();

    const monthOrdersAmount = await getMonthOrdersAmount.execute();

    return response.json(monthOrdersAmount);
  }
}
