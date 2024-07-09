import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryHistoryRepository } from "../../../repositories/in-memory/in-memory-history-repository";
import { ListHistoryUseCase } from "./list-history-usecase";

let historyRepository: InMemoryHistoryRepository;
let listHistoryUseCase: ListHistoryUseCase;

describe("List Histories", () => {
  beforeEach(async () => {
    historyRepository = new InMemoryHistoryRepository();
    listHistoryUseCase = new ListHistoryUseCase(historyRepository);
  });

  it("should be able to list all histories", async () => {
    await historyRepository.create({
      name: "Test History 1",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    await historyRepository.create({
      name: "Test History 2",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    const { histories, totalHistories } = await listHistoryUseCase.execute({
      pageNumber: 1,
    });

    expect(totalHistories).toEqual(2);
    expect(histories).toEqual([
      expect.objectContaining({ name: "Test History 1" }),
      expect.objectContaining({ name: "Test History 2" }),
    ]);
  });
});
