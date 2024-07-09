import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBrandRepostory } from "../../../repositories/in-memory/in-memory-brand-repository";
import { CreateBrandUseCase } from "./create-brand-usecase";
import { AppError } from "../../../errors/AppError/AppError";

let brandRepository: InMemoryBrandRepostory;
let createBrandUseCase: CreateBrandUseCase;

describe("Create Brand", () => {
  beforeEach(() => {
    brandRepository = new InMemoryBrandRepostory();
    createBrandUseCase = new CreateBrandUseCase(brandRepository);
  });

  it("should be able to create a brand", async () => {
    const { brand } = await createBrandUseCase.execute({
      name: "Fiat",
    });

    expect(brand.id).toEqual(expect.any(String));
  });

  it("should not be able to create a brand if she already exists", async () => {
    await createBrandUseCase.execute({
      name: "Fiat",
    });

    await expect(() =>
      createBrandUseCase.execute({
        name: "Fiat",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
