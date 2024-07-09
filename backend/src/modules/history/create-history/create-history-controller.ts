import { Request, Response } from "express";
import { CreateHistoryUseCase } from "./create-history-usecase";
import { convertToNumber } from "../../../utils/convertToNumber";
<<<<<<< HEAD
import { MakeCreateHistoryUseCase } from "../../../factories/make-create-history-use-case";

export class CreateHistoryController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brandName, hasAccepted, offer, productId } =
=======

export class CreateHistoryController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, hasAccepted, offer, productId } =
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
      request.body;

    const priceNumber = convertToNumber(price);
    const offerNumber = convertToNumber(offer);

<<<<<<< HEAD
    const createHistoryUseCase = MakeCreateHistoryUseCase();
=======
    const createHistoryUseCase = new CreateHistoryUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    const history = await createHistoryUseCase.execute({
      name,
      price: priceNumber,
      yearCar,
<<<<<<< HEAD
      brandName,
=======
      brand,
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
      hasAccepted,
      offer: offerNumber,
      productId,
    });

    return response.json(history);
  }
}
