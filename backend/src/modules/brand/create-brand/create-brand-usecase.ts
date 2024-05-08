import { AppError } from "../../../errors/AppError/AppError";
import { prisma } from "../../../prisma/client";

export class CreateBrandUseCase {
  async execute(name: string) {
    const verifyIfBrandAlreadyExist = await prisma.brand.findFirst({
      where: {
        name,
      },
    });

    if (verifyIfBrandAlreadyExist)
      throw new AppError("This brand already exist");

    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    return brand;
  }
}
