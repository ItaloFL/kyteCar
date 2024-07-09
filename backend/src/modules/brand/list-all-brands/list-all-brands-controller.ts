import { Request, Response } from "express";
import { MakeListAllBrandUseCase } from "../../../factories/make-list-all-brand-use-case";

export class ListAllBrandsController {
  async handle(request: Request, response: Response) {
    const listAllBrandsUseCase = MakeListAllBrandUseCase();

    const brands = await listAllBrandsUseCase.execute();

    return response.json(brands);
  }
}
