<<<<<<< HEAD
import { Brand } from "@prisma/client";
import { AppError } from "../../../errors/AppError/AppError";
import { BrandRepository } from "../../../repositories/brand-repository";

interface CreateBrandRequest {
  name: string;
}

type CreateBrandResponse = {
  brand: Brand;
};

export class CreateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute({ name }: CreateBrandRequest): Promise<CreateBrandResponse> {
    const verifyIfBrandAlreadyExist = await this.brandRepository.findByName(
      name
    );
=======
import { AppError } from "../../../errors/AppError/AppError";
import { prisma } from "../../../prisma/client";

export class CreateBrandUseCase {
  async execute(name: string) {
    const verifyIfBrandAlreadyExist = await prisma.brand.findFirst({
      where: {
        name,
      },
    });
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad

    if (verifyIfBrandAlreadyExist)
      throw new AppError("This brand already exist");

<<<<<<< HEAD
    const brand = await this.brandRepository.create({
      name,
    });

    return { brand };
=======
    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    return brand;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
