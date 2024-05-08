import { prisma } from "../../../prisma/client";

export class ListProductsUseCase {
  async execute(pageNumber: number) {
    const products = await prisma.product.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalProducts = await prisma.product.count();

    return { products, totalProducts };
  }
}
