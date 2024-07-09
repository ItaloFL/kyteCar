import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { ListProductsUseCase } from "./list-products-usecase";

let productRepository: InMemoryProductRepository;
let listProductsUseCase: ListProductsUseCase;

describe("List Produc", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    listProductsUseCase = new ListProductsUseCase(productRepository);
  });

  it("should be able to list a products", async () => {
    await productRepository.create({
      name: "Test Product 1",
      price: 40000,
      brandName: "Fiat",
      details: "Test details",
      imageURL: "TestURLImage",
      yearCar: "2019",
    });

    await productRepository.create({
      name: "Test Product 2",
      price: 40000,
      brandName: "Fiat",
      details: "Test details",
      imageURL: "TestURLImage",
      yearCar: "2019",
    });

    const { products } = await listProductsUseCase.execute({
      pageNumber: 1
    });

    expect(products).toEqual([
      expect.objectContaining({ name: "Test Product 1" }),
      expect.objectContaining({ name: "Test Product 2" }),
    ]);
  });
});
