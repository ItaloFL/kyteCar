import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryHistoryRepository } from "../../../repositories/in-memory/in-memory-history-repository";
import { GetMonthOrdersAmountUseCase } from "./get-month-orders-amount-use-case";

let historyRepository: InMemoryHistoryRepository;
let getMonthOrdersAmountUseCase: GetMonthOrdersAmountUseCase;

describe("Get Month Orders Amount", () => {
  beforeEach(() => {
    historyRepository = new InMemoryHistoryRepository();
    getMonthOrdersAmountUseCase = new GetMonthOrdersAmountUseCase(
      historyRepository
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be bale to get a amount of orders in a intire month", async () => {
    vi.setSystemTime(new Date(2024, 3, 1, 10, 0));

    await historyRepository.create({
      name: "Test History 1",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    vi.setSystemTime(new Date(2024, 3, 2, 10, 0));

    const OneMonthInMs = 1000 * 60 * 60 * 24 * 31;
    vi.advanceTimersByTime(OneMonthInMs);

    await historyRepository.create({
      name: "Test History 2",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    await historyRepository.create({
      name: "Test History 3",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    const { monthOrders, monthOrdersAmount } =
      await getMonthOrdersAmountUseCase.execute();

    expect(monthOrdersAmount).toEqual(2);
    expect(monthOrders).toEqual([
      expect.objectContaining({ name: "Test History 2" }),
      expect.objectContaining({ name: "Test History 3" }),
    ]);
  });
});
