import { AppError } from "../../../errors/AppError/AppError";
import { prisma } from "../../../prisma/client";

interface ListProductType {
  pageNumber: number;
  search: string;
}

export class FindProductUseCase {
  async execute({ search, pageNumber }: ListProductType) {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip: (pageNumber - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalSearchProducts = await prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    if (!products) throw new AppError("This product not found");

    return { products, totalSearchProducts };
  }
}
