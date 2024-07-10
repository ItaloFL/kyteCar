import { Request, Response } from "express";
import { CreateHistoryUseCase } from "./create-history-usecase";
import { convertToNumber } from "../../../utils/convertToNumber";
import { MakeCreateHistoryUseCase } from "../../../factories/make-create-history-use-case";

export class CreateHistoryController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, hasAccepted, offer, productId } =
      request.body;

    const priceNumber = convertToNumber(price);
    const offerNumber = convertToNumber(offer);

    const createHistoryUseCase = MakeCreateHistoryUseCase();

    const history = await createHistoryUseCase.execute({
      name,
      price: priceNumber,
      yearCar,
      brandName: brand,
      hasAccepted,
      offer: offerNumber,
      productId,
    });

    return response.json(history);
  }
}
