import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDemandRepository } from "../../../repositories/in-memory/in-memory-demand-repository";
import { FindDemandByIdUseCase } from "./find-demand-by-id-usecase";

let demandRepository: InMemoryDemandRepository;
let findDemandByIdUseCase: FindDemandByIdUseCase;

describe("Find Demand By Id", () => {
  beforeEach(() => {
    demandRepository = new InMemoryDemandRepository();
    findDemandByIdUseCase = new FindDemandByIdUseCase(demandRepository);
  });

  it("should be able to find a product by id", async () => {
    const createdDemand = await demandRepository.create({
      name: "Test Demand",
      price: 10000,
      offer: 9000,
      brandName: "Test Brand",
      paymentMethod: "cash",
      productId: "Test Product Id",
      yearCar: "2019",
    });

    const { demand } = await findDemandByIdUseCase.execute({
      id: createdDemand.id,
    });

    expect(demand).toEqual(expect.objectContaining({ name: "Test Demand" }));
  });
});
