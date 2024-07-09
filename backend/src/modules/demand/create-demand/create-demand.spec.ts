import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryDemandRepository } from "../../../repositories/in-memory/in-memory-demand-repository";
import { InMemoryBrandRepostory } from "../../../repositories/in-memory/in-memory-brand-repository";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { CreateDemandUseCase } from "./create-demand-usecase";
import { AppError } from "../../../errors/AppError/AppError";

let demandRepository: InMemoryDemandRepository;
let brandRepository: InMemoryBrandRepostory;
let productRepository: InMemoryProductRepository;
let createDemandUseCase: CreateDemandUseCase;

describe("Create Demand", () => {
  beforeEach(() => {
    demandRepository = new InMemoryDemandRepository();
    brandRepository = new InMemoryBrandRepostory();
    productRepository = new InMemoryProductRepository();
    createDemandUseCase = new CreateDemandUseCase(
      demandRepository,
      brandRepository,
      productRepository
    );
  });

  it("should be able to create a demand", async () => {
    const brand = await brandRepository.create({
      name: "Test Brand",
    });

    const product = await productRepository.create({
      name: "Test Product",
      price: 40000,
      brandName: brand.name,
      details: "Test details",
      imageURL: "TestURLImage",
      yearCar: "2019",
    });

    const { demand } = await createDemandUseCase.execute({
      name: "Test Demand",
      price: 10000,
      offer: 9000,
      brandName: brand.name,
      paymentMethod: "cash",
      productId: product.id,
      yearCar: "2019",
    });

    expect(demand.id).toEqual(expect.any(String));
  });

  it("should not be able to create a demand if brand does not exist", async () => {
    const product = await productRepository.create({
      name: "Test Product",
      price: 40000,
      brandName: "NoExistentBrand",
      details: "Test details",
      imageURL: "TestURLImage",
      yearCar: "2019",
    });

    await expect(() =>
      createDemandUseCase.execute({
        name: "Test Demand",
        price: 10000,
        offer: 9000,
        brandName: "NoExistentBrand",
        paymentMethod: "cash",
        productId: product.id,
        yearCar: "2019",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a demand if Product does not exist", async () => {
    const brand = await brandRepository.create({
      name: "Test Brand",
    });

    await expect(() =>
      createDemandUseCase.execute({
        name: "Test Demand",
        price: 10000,
        offer: 9000,
        brandName: brand.name,
        paymentMethod: "cash",
        productId: "NoExistentProductId",
        yearCar: "2019",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
