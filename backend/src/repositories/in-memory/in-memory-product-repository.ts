import { Prisma, Product } from "@prisma/client";
import { ProductRepository } from "../product-repository";
import { randomUUID } from "node:crypto";

export class InMemoryProductRepository implements ProductRepository {
  data: Product[] = [];

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name,
      price: data.price,
      yearCar: data.yearCar,
      details: data.details,
      imageURL: data.imageURL,
      brandName: data.brandName,
      createdAt: new Date(),
    };

    this.data.push(product);

    return product;
  }

  async findMany(search: string, pageNumber: number) {
    return this.data
      .filter((item) => item.name.includes(search))
      .splice((pageNumber - 1) * pageNumber * 10);
  }

  async findById(id: string) {
    const product = this.data.find((item) => item.id === id);

    if (!product) return null;

    return product;
  }

  async count(search: string) {
    return this.data.filter((item) => item.name.includes(search)).length;
  }

  async list(pageNumber: number) {
    return this.data.splice((pageNumber - 1) * pageNumber * 10);
  }

  async listMany(pageNumber: number) {
    return this.data.splice((pageNumber - 1) * pageNumber * 10);
  }

  async listCount() {
    return this.data.length;
  }
}
