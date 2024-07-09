import { Request, Response } from "express";
import { FindProductByIdUseCase } from "./find-product-by-id-usecase";
<<<<<<< HEAD
import { MakeFindProductByIdUseCase } from "../../../factories/make-find-product-by-id-use-case";
=======
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class FindProductByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

<<<<<<< HEAD
    const findProductByIdUseCase = MakeFindProductByIdUseCase();

    const product = await findProductByIdUseCase.execute({ id });
=======
    const findProductByIdUseCase = new FindProductByIdUseCase();

    const product = await findProductByIdUseCase.execute(id);
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    return response.json(product);
  }
}
