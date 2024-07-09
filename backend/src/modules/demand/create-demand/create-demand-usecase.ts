import { Demand } from "@prisma/client";
import { DemandRepository } from "../../../repositories/demand-repository";
import { BrandRepository } from "../../../repositories/brand-repository";
import { ProductRepository } from "../../../repositories/product-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface CreateDemandRequest {
  productId: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
  brandName: string;
  paymentMethod: "cash" | "credit" | "pix";
}

type CreateDemandResponse = {
  demand: Demand;
};

export class CreateDemandUseCase {
  constructor(
    private demandRespository: DemandRepository,
    private brandRepository: BrandRepository,
    private productRepository: ProductRepository
  ) {}

  async execute({
    name,
    price,
    offer,
    yearCar,
    brandName,
    productId,
    paymentMethod,
  }: CreateDemandRequest): Promise<CreateDemandResponse> {
    const verifyIfBrandExist = await this.brandRepository.findByName(brandName);

    if (!verifyIfBrandExist) throw new AppError("Brand does not exist");

    const verifyIfProductExist = await this.productRepository.findById(
      productId
    );

    if (!verifyIfProductExist) throw new AppError("Product does not exist");

    const demand = await this.demandRespository.create({
      name,
      price,
      offer,
      yearCar,
      brandName,
      paymentMethod,
      productId,
    });

    return { demand };
  }
}
