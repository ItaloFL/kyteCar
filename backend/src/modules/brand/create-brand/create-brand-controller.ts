import { Request, Response } from "express";
import { MakeCreateBrandUseCase } from "../../../factories/make-create-brand-use-case";

export class CreateBrandController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createBrandUseCase = MakeCreateBrandUseCase();

    const brand = await createBrandUseCase.execute({
      name,
    });

    return response.json(brand);
  }
}
