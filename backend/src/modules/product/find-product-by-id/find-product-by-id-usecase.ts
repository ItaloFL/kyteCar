<<<<<<< HEAD
import { Product } from "@prisma/client";
import { ProductRepository } from "../../../repositories/product-repository";
import { AppError } from "../../../errors/AppError/AppError";

interface FindProducyByIdRequest {
  id: string;
}

type FindProductByIdResponse = {
  product: Product;
};

export class FindProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: FindProducyByIdRequest): Promise<FindProductByIdResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) throw new AppError("Product does not exists");

    return { product };
=======
import { prisma } from "../../../prisma/client";

export class FindProductByIdUseCase {
  async execute(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    return product;
>>>>>>> 091c3e7d68f50645d7435d047f52d4c3b8af1dad
  }
}
