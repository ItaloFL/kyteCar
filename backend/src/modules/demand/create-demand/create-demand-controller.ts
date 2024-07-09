import { Request, Response } from "express";
<<<<<<< HEAD
import { convertToNumber } from "../../../utils/convertToNumber";
import { MakeCreateDemandUseCase } from "../../../factories/make-create-demand-use-case";

export class CreateDemandController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brandName, offer, paymentMethod, productId } =
=======
import { CreateDemandUseCase } from "./create-demand-usecase";
import { convertToNumber } from "../../../utils/convertToNumber";

export class CreateDemandController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, offer, paymentMethod, productId } =
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
      request.body;

    const priceNumber = convertToNumber(price);
    const offerNumber = convertToNumber(offer);

<<<<<<< HEAD
    const createDemandUseCase = MakeCreateDemandUseCase();
=======
    const createDemandUseCase = new CreateDemandUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const demand = await createDemandUseCase.execute({
      name,
      price: priceNumber,
      offer: offerNumber,
      yearCar,
<<<<<<< HEAD
      brandName,
=======
      brand,
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
      paymentMethod,
      productId,
    });

    return response.json(demand);
  }
}
