import { Request, Response } from "express";
<<<<<<< HEAD
import { MakeCreateBrandUseCase } from "../../../factories/make-create-brand-use-case";

=======
import { CreateBrandUseCase } from "./create-brand-usecase";
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class CreateBrandController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

<<<<<<< HEAD
    const createBrandUseCase = MakeCreateBrandUseCase();
=======
    const createBrandUseCase = new CreateBrandUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const brand = await createBrandUseCase.execute(name);

    return response.json(brand);
  }
}
