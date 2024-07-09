import { Request, Response } from "express";
import { CreateProductUseCase } from "./create-product-usecase";
import { convertToNumber } from "../../../utils/convertToNumber";
<<<<<<< HEAD
import { MakeCreateProductUseCase } from "../../../factories/make-create-product-use-case";
=======
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, price, yearCar, brand, details } = request.body;
    const imageProduct = request.file?.filename;

    const priceNumber = convertToNumber(price);

<<<<<<< HEAD
    const createProductUseCase = MakeCreateProductUseCase();
=======
    const createProductUseCase = new CreateProductUseCase();
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

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
