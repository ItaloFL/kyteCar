import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBrandRepostory } from "../../../repositories/in-memory/in-memory-brand-repository";
import { ListAllBrandsUseCase } from "./list-all-brands-usecase";

let brandRepository: InMemoryBrandRepostory;
let listAllBrandsUseCase: ListAllBrandsUseCase;

describe("List Brands", () => {
  beforeEach(() => {
    brandRepository = new InMemoryBrandRepostory();
    listAllBrandsUseCase = new ListAllBrandsUseCase(brandRepository);
  });

  it("should be able to list all brands", async () => {
    await brandRepository.create({
      name: "Fiat",
    });

    await brandRepository.create({
      name: "Audi",
    });

    const { brands } = await listAllBrandsUseCase.execute();

    expect(brands).toEqual([
      expect.objectContaining({ name: "Fiat" }),
      expect.objectContaining({ name: "Audi" }),
    ]);
  });
});
