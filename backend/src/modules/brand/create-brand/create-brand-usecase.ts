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

    if (verifyIfBrandAlreadyExist)
      throw new AppError("This brand already exist");

    const brand = await this.brandRepository.create({
      name,
    });

    return { brand };
  }
}
