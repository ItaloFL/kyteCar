import { Request, Response } from "express";
import { FindProductUseCase } from "./find-product-usecase";

export class FindProductController {
  async handle(request: Request, response: Response) {
    const { search, page } = request.query;

    const pageNumber = parseInt(page as string);

    const searchName = search as string;

    const findProductUseCase = new FindProductUseCase();

    const products = await findProductUseCase.execute({
      search: searchName,
      pageNumber,
    });

    return response.json(products);
  }
}
