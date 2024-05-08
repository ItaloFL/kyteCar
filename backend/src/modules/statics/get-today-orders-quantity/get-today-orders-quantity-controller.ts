import { Request, Response } from "express";
import { GetTodayOrdersQuantityUseCase } from "./get-today-orders-quantity-use-case";

export class GetTodayOrdersQuantityController {
  async handle(request: Request, response: Response) {

    const getTodayOrdersQuantityUseCase = new GetTodayOrdersQuantityUseCase()

    const ordersQuantity = await getTodayOrdersQuantityUseCase.execute()

    return response.json(ordersQuantity)
  }
}
