import { Request, Response } from "express";
import { convertToNumber } from "../../../utils/convertToNumber";
import { MakeCreateDemandUseCase } from "../../../factories/make-create-demand-use-case";

export class CreateDemandController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brandName, offer, paymentMethod, productId } =
      request.body;

    const priceNumber = convertToNumber(price);
    const offerNumber = convertToNumber(offer);

    const createDemandUseCase = MakeCreateDemandUseCase();

    const demand = await createDemandUseCase.execute({
      name,
      price: priceNumber,
      offer: offerNumber,
      yearCar,
      brandName,
      paymentMethod,
      productId,
    });

    return response.json(demand);
  }
}
