import { Request, Response } from "express";
import { MakeGetTodayOrdersQuantityUseCase } from "../../../factories/make-get-today-orders-quantity-use-case";

export class GetTodayOrdersQuantityController {
  async handle(request: Request, response: Response) {
    const getTodayOrdersQuantityUseCase = MakeGetTodayOrdersQuantityUseCase();

    const today = new Date()

    const ordersQuantity = await getTodayOrdersQuantityUseCase.execute(today);

    return response.json(ordersQuantity);
  }
}
