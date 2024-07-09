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
  }
}
