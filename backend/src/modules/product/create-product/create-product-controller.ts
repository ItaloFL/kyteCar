import { Request, Response } from "express";
import { CreateProductUseCase } from "./create-product-usecase";
import { convertToNumber } from "../../../utils/convertToNumber";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, details } = request.body;
    const imageProduct = request.file?.filename;

    const priceNumber = convertToNumber(price);

    const createProductUseCase = new CreateProductUseCase();

    const product = await createProductUseCase.execute({
      name,
      price: priceNumber,
      yearCar,
      details,
      brand,
      imageURL: `${process.env.APP_URL}/file/${imageProduct}`,
    });

    return response.json(product);
  }
}
