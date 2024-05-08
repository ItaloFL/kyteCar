import { Request, Response } from "express";
import { ListProductsUseCase } from "./list-products-usecase";

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

    const listProductsUseCase = new ListProductsUseCase();

    const products = await listProductsUseCase.execute(pageNumber);

    return response.json(products);
  }
}
