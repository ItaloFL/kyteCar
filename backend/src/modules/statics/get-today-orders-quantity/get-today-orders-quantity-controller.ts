import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeGetTodayOrdersQuantityUseCase } from "../../../factories/make-get-today-orders-quantity-use-case";

export class GetTodayOrdersQuantityController {
  async handle(request: Request, response: Response) {
    const getTodayOrdersQuantityUseCase = MakeGetTodayOrdersQuantityUseCase();

    const today = new Date()

    const ordersQuantity = await getTodayOrdersQuantityUseCase.execute(today);

    return response.json(ordersQuantity);
=======
import { GetTodayOrdersQuantityUseCase } from "./get-today-orders-quantity-use-case";

export class GetTodayOrdersQuantityController {
  async handle(request: Request, response: Response) {

    const getTodayOrdersQuantityUseCase = new GetTodayOrdersQuantityUseCase()

    const ordersQuantity = await getTodayOrdersQuantityUseCase.execute()

    return response.json(ordersQuantity)
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
