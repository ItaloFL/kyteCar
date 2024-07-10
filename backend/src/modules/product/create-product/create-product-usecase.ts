import { Product } from "@prisma/client";
import { ProductRepository } from "../../../repositories/product-repository";
import { BrandRepository } from "../../../repositories/brand-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface CreateProductRequest {
  name: string;
  price: number;
  yearCar: string;
  details: string;
  imageURL: string;
  brand: string;
}

type CreateProductResponse = {
  product: Product;
};

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository
  ) {}

  async execute({
    name,
    price,
    yearCar,
    details,
    imageURL,
    brand,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const verifyIfBrandExits = await this.brandRepository.findByName(brand);

    if (!verifyIfBrandExits) {
      throw new AppError("Brand does not exist");
    }
    
    const product = await this.productRepository.create({
      name,
      price,
      yearCar,
      details,
      imageURL,
      brandName: brand,
    });

    return { product };
  }
}
