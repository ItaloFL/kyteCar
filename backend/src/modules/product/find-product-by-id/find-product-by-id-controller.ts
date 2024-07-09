import { Request, Response } from "express";
import { FindProductByIdUseCase } from "./find-product-by-id-usecase";
import { MakeFindProductByIdUseCase } from "../../../factories/make-find-product-by-id-use-case";

export class FindProductByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProductByIdUseCase = MakeFindProductByIdUseCase();

    const product = await findProductByIdUseCase.execute({ id });

    return response.json(product);
  }
}
