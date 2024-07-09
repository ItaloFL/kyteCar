import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProductRepository } from "../../../repositories/in-memory/in-memory-product-repository";
import { FindProductByIdUseCase } from "./find-product-by-id-usecase";

let productRepository: InMemoryProductRepository;
let findProductByIdUseCase: FindProductByIdUseCase;

describe("Find Product By Id", () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    findProductByIdUseCase = new FindProductByIdUseCase(productRepository);
  });

  it("should be able to find a product by id", async () => {
    const createdProduct = await productRepository.create({
      name: "Test Product",
      price: 40000,
      brandName: "Fiat",
      details: "Test details",
      imageURL: "TestURLImage",
      yearCar: "2019",
    });

    const { product } = await findProductByIdUseCase.execute({
      id: createdProduct.id,
    });

    expect(product.id).toEqual(expect.any(String));
  });
});
