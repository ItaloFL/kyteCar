import { describe, beforeEach, it, expect } from "vitest";
import { CreateProductUseCase } from "./create-product-usecase";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { InMemoryBrandRepostory } from "../../../repositories/in-memory/in-memory-brand-repository";
import { AppError } from "../../../errors/AppError/AppError";

let productRepository: InMemoryProductRepository;
let brandRepository: InMemoryBrandRepostory;
let createProductUseCase: CreateProductUseCase;

describe("Create Product", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    brandRepository = new InMemoryBrandRepostory();
    createProductUseCase = new CreateProductUseCase(
      productRepository,
      brandRepository
    );
  });

  it("should be able to create a product", async () => {
    await brandRepository.create({
      name: "Fiat",
    });

    const { product } = await createProductUseCase.execute({
      name: "Test Product",
      price: 40000,
      brand: "Fiat",
      details: "Test details",
      imageURL: "TestURLImage",
      yearCar: "2019",
    });

    expect(product.id).toEqual(expect.any(String));
  });

  it("should not be able to create a product if brand does not exists", async () => {
    await expect(() =>
      createProductUseCase.execute({
        name: "Test Product",
        price: 40000,
        brand: "Fiat",
        details: "Test details",
        imageURL: "TestURLImage",
        yearCar: "2019",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
