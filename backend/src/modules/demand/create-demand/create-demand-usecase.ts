<<<<<<< HEAD
import { Demand } from "@prisma/client";
import { DemandRepository } from "../../../repositories/demand-repository";
import { BrandRepository } from "../../../repositories/brand-repository";
import { ProductRepository } from "../../../repositories/product-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface CreateDemandRequest {
=======
import { prisma } from "../../../prisma/client";

interface DemandType {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  productId: string;
  name: string;
  price: number;
  offer: number;
  yearCar: string;
<<<<<<< HEAD
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

=======
  brand: string;
  paymentMethod: "cash" | "credit" | "pix";
}

export class CreateDemandUseCase {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  async execute({
    name,
    price,
    offer,
    yearCar,
<<<<<<< HEAD
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
=======
    brand,
    productId,
    paymentMethod,
  }: DemandType) {
    const demand = await prisma.demand.create({
      data: {
        name,
        price,
        offer,
        yearCar,
        brandName: brand,
        paymentMethod,
        productId
      },
    });

    return demand;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
