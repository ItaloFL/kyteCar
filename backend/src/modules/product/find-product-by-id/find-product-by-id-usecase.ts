import { prisma } from "../../../prisma/client";

export class FindProductByIdUseCase {
  async execute(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    return product;
  }
}
