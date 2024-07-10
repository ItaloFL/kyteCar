import { Request, Response } from "express";
import { MakeListProductsUseCase } from "../../../factories/make-list-products-use-case";

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

    const listProductsUseCase = MakeListProductsUseCase();

    const products = await listProductsUseCase.execute({
      pageNumber,
    });

    return response.json(products);
  }
}
