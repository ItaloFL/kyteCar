import { Prisma } from "@prisma/client";
import { ProductRepository } from "../product-repository";
import { prisma } from "../../prisma/client";

export class PrismaProductRepository implements ProductRepository {
  async create({
    name,
    price,
    yearCar,
    details,
    imageURL,
    brandName,
  }: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        yearCar,
        details,
        imageURL,
        brandName,
      },
    });

    return product;
  }

  async findMany(search: string, pageNumber: number) {
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

    return products;
  }

  async findById(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    return product;
  }

  async count(search: string) {
    const productsCount = await prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return productsCount;
  }

  async listMany(pageNumber: number) {
    const products = await prisma.product.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
    });

    return products;
  }

  async listCount() {
    const productsCount = await prisma.product.count();

    return productsCount;
  }
}
