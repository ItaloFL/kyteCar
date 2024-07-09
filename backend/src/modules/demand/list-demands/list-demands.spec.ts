import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDemandRepository } from "../../../repositories/in-memory/in-memory-demand-repository";
import { ListDemandsUseCase } from "./list-demands-usecase";

let demandRepository: InMemoryDemandRepository;
let listDemandsUseCase: ListDemandsUseCase;

describe("List Demands", () => {
  beforeEach(() => {
    demandRepository = new InMemoryDemandRepository();
    listDemandsUseCase = new ListDemandsUseCase(demandRepository);
  });

  it("should be able to list demands", async () => {
    await demandRepository.create({
      name: "Test Demand 1",
      price: 10000,
      offer: 9000,
      brandName: "Test Brand",
      paymentMethod: "cash",
      productId: "Test ProductId",
      yearCar: "2019",
    });

    await demandRepository.create({
      name: "Test Demand 2",
      price: 10000,
      offer: 9000,
      brandName: "Test Brand",
      paymentMethod: "cash",
      productId: "Test ProductId",
      yearCar: "2019",
    });

    const { demands, totalDemands } = await listDemandsUseCase.execute({
      pageNumber: 1,
    });

    expect(totalDemands).toEqual(2);
    expect(demands).toEqual([
      expect.objectContaining({ name: "Test Demand 1" }),
      expect.objectContaining({ name: "Test Demand 2" }),
    ]);
  });
});
