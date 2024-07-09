import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeListAllBrandUseCase } from "../../../factories/make-list-all-brand-use-case";

export class ListAllBrandsController {
  async handle(request: Request, response: Response) {
    const listAllBrandsUseCase = MakeListAllBrandUseCase();
=======
import { ListAllBrandsUseCase } from "./list-all-brands-usecase";

export class ListAllBrandsController {
  async handle(request: Request, response: Response) {
    const listAllBrandsUseCase = new ListAllBrandsUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const brands = await listAllBrandsUseCase.execute();

    return response.json(brands);
  }
}
