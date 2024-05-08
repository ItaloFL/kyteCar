import { prisma } from "../../../prisma/client";

interface ProductType {
  name: string;
  price: number;
  yearCar: string;
  details: string;
  imageURL: string;
  brand: string;
}

export class CreateProductUseCase {
  async execute({
    name,
    price,
    yearCar,
    details,
    imageURL,
    brand,
  }: ProductType) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        yearCar,
        details,
        brandName: brand,
        imageURL,
      },
    });

    return product;
  }
}
