<<<<<<< HEAD
import { Product } from "@prisma/client";
import { ProductRepository } from "../../../repositories/product-repository";
import { BrandRepository } from "../../../repositories/brand-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface CreateProductRequest {
=======
import { prisma } from "../../../prisma/client";

interface ProductType {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  name: string;
  price: number;
  yearCar: string;
  details: string;
  imageURL: string;
  brand: string;
}

<<<<<<< HEAD
type CreateProductResponse = {
  product: Product;
};

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository
  ) {}

=======
export class CreateProductUseCase {
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  async execute({
    name,
    price,
    yearCar,
    details,
    imageURL,
    brand,
<<<<<<< HEAD
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
=======
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
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
