import { Request, Response } from "express";
import { FindProductUseCase } from "./find-product-usecase";
<<<<<<< HEAD
import { MakeFindProductUseCase } from "../../../factories/make-find-product-use-case";
=======
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class FindProductController {
  async handle(request: Request, response: Response) {
    const { search, page } = request.query;

    const pageNumber = parseInt(page as string);

    const searchName = search as string;

<<<<<<< HEAD
    const findProductUseCase = MakeFindProductUseCase();
=======
    const findProductUseCase = new FindProductUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const products = await findProductUseCase.execute({
      search: searchName,
      pageNumber,
    });

    return response.json(products);
  }
}
