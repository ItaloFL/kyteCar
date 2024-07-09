import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryHistoryRepository } from "../../../repositories/in-memory/in-memory-history-repository";
import { GetTodayOrdersQuantityUseCase } from "./get-today-orders-quantity-use-case";

let historyRepository: InMemoryHistoryRepository;
let getTodayOrdersQuantity: GetTodayOrdersQuantityUseCase;

describe("Get Today Orders Quantity", () => {
  beforeEach(async () => {
    historyRepository = new InMemoryHistoryRepository();
    getTodayOrdersQuantity = new GetTodayOrdersQuantityUseCase(
      historyRepository
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to get today orders quantity", async () => {
    let date = new Date(2024, 7, 8);
    vi.setSystemTime(date);

    await historyRepository.create({
      name: "Test History 1",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    date = new Date(2024, 7, 6);
    vi.setSystemTime(date);

    await historyRepository.create({
      name: "Test History 2",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    const { totalOrdersToday } = await getTodayOrdersQuantity.execute(date);

    expect(totalOrdersToday).toEqual(1);
  });
});
