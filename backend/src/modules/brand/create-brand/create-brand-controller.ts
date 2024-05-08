import { Request, Response } from "express";
import { CreateBrandUseCase } from "./create-brand-usecase";

export class CreateBrandController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createBrandUseCase = new CreateBrandUseCase();

    const brand = await createBrandUseCase.execute(name);

    return response.json(brand);
  }
}
