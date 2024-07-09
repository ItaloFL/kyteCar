import { Request, Response } from "express";
import { ListProductsUseCase } from "./list-products-usecase";
<<<<<<< HEAD
import { MakeListProductsUseCase } from "../../../factories/make-list-products-use-case";
=======
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const { page } = request.query;

    const pageNumber = parseInt(page as string);

<<<<<<< HEAD
    const listProductsUseCase = MakeListProductsUseCase();

    const products = await listProductsUseCase.execute({
      pageNumber,
    });
=======
    const listProductsUseCase = new ListProductsUseCase();

    const products = await listProductsUseCase.execute(pageNumber);
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return response.json(products);
  }
}
