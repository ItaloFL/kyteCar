import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryHistoryRepository } from "../../../repositories/in-memory/in-memory-history-repository";
import { CreateHistoryUseCase } from "./create-history-usecase";

let historyRepository: InMemoryHistoryRepository;
let createHistoryUseCase: CreateHistoryUseCase;

describe("Create History", () => {
  beforeEach(() => {
    historyRepository = new InMemoryHistoryRepository();
    createHistoryUseCase = new CreateHistoryUseCase(historyRepository);
  });

  it("should be able to create a history", async () => {
    const { history } = await createHistoryUseCase.execute({
      name: "Test History",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    expect(history.id).toEqual(expect.any(String));
  });
});
