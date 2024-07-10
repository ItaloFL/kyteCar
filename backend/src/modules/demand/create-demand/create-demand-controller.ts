import { Request, Response } from "express";
import { convertToNumber } from "../../../utils/convertToNumber";
import { MakeCreateDemandUseCase } from "../../../factories/make-create-demand-use-case";

export class CreateDemandController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, offer, paymentMethod, productId } =
      request.body;

    const priceNumber = convertToNumber(price);
    const offerNumber = convertToNumber(offer);

    const createDemandUseCase = MakeCreateDemandUseCase();

    const demand = await createDemandUseCase.execute({
      name,
      price: priceNumber,
      offer: offerNumber,
      yearCar,
      brandName: brand,
      paymentMethod,
      productId,
    });

    return response.json(demand);
  }
}
