import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { FindProductUseCase } from "./find-product-usecase";

let productRepository: InMemoryProductRepository;
let findProductUseCase: FindProductUseCase;

describe("Find Products", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    findProductUseCase = new FindProductUseCase(productRepository);
  });

  it("should be able to find products", async () => {
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

    const { products } = await findProductUseCase.execute({
      search: "Product",
      pageNumber: 1,
    });

    expect(products).toEqual([
      expect.objectContaining({ name: "Test Product 1" }),
      expect.objectContaining({ name: "Test Product 2" }),
    ]);
  });
});
