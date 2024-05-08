import { Request, Response } from "express";
import { CreateDemandUseCase } from "./create-demand-usecase";
import { convertToNumber } from "../../../utils/convertToNumber";

export class CreateDemandController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, offer, paymentMethod, productId } =
      request.body;

    const priceNumber = convertToNumber(price);
    const offerNumber = convertToNumber(offer);

    const createDemandUseCase = new CreateDemandUseCase();

    const demand = await createDemandUseCase.execute({
      name,
      price: priceNumber,
      offer: offerNumber,
      yearCar,
      brand,
      paymentMethod,
      productId,
    });

    return response.json(demand);
  }
}
