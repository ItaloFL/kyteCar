import { Request, Response } from "express";
import { ListAllBrandsUseCase } from "./list-all-brands-usecase";

export class ListAllBrandsController {
  async handle(request: Request, response: Response) {
    const listAllBrandsUseCase = new ListAllBrandsUseCase();

    const brands = await listAllBrandsUseCase.execute();

    return response.json(brands);
  }
}
