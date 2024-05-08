import { Request, Response } from "express";
import { FindProductByIdUseCase } from "./find-product-by-id-usecase";

export class FindProductByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProductByIdUseCase = new FindProductByIdUseCase();

    const product = await findProductByIdUseCase.execute(id);

    return response.json(product);
  }
}
