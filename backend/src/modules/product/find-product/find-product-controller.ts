import { Request, Response } from "express";
import { FindProductUseCase } from "./find-product-usecase";
import { MakeFindProductUseCase } from "../../../factories/make-find-product-use-case";

export class FindProductController {
  async handle(request: Request, response: Response) {
    const { search, page } = request.query;

    const pageNumber = parseInt(page as string);

    const searchName = search as string;

    const findProductUseCase = MakeFindProductUseCase();

    const products = await findProductUseCase.execute({
      search: searchName,
      pageNumber,
    });

    return response.json(products);
  }
}
