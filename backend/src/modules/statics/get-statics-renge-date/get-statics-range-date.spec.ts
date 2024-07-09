import { describe, vi, it, beforeEach, afterEach, expect } from "vitest";
import { InMemoryHistoryRepository } from "../../../repositories/in-memory/in-memory-history-repository";
import { GetStaticsRangeDateUseCase } from "./get-statics-range-date-use-case";

let historyRepository: InMemoryHistoryRepository;
let getStaticsRangeDateUseCase: GetStaticsRangeDateUseCase;

describe("Get Statics Range Date", () => {
  beforeEach(() => {
    historyRepository = new InMemoryHistoryRepository();
    getStaticsRangeDateUseCase = new GetStaticsRangeDateUseCase(
      historyRepository
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to get a history into range date", async () => {
    vi.setSystemTime(new Date(2024, 3, 1, 10, 0));
    const twoDaysIntoMs = 1000 * 60 * 60 * 24 * 2;

    await historyRepository.create({
      name: "Test History 1",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    vi.advanceTimersByTime(twoDaysIntoMs);

    await historyRepository.create({
      name: "Test History 2",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    vi.advanceTimersByTime(twoDaysIntoMs);

    await historyRepository.create({
      name: "Test History 3",
      price: 10000,
      yearCar: "2019",
      brandName: "Test Brand",
      hasAccepted: true,
      offer: 9500,
      productId: "Test Product Id",
    });

    const { result } = await getStaticsRangeDateUseCase.execute({
      initialDate: "2024-04-01",
      finalDate: "2024-04-07",
    });

    expect(result).toHaveLength(7);
    expect(result).toEqual([
      expect.objectContaining({ date: "01/04/2024", offer: 9500 }),
      expect.objectContaining({ date: "02/04/2024", offer: 0 }),
      expect.objectContaining({ date: "03/04/2024", offer: 9500 }),
      expect.objectContaining({ date: "04/04/2024", offer: 0 }),
      expect.objectContaining({ date: "05/04/2024", offer: 9500 }),
      expect.objectContaining({ date: "06/04/2024", offer: 0 }),
      expect.objectContaining({ date: "07/04/2024", offer: 0 }),
    ]);
  });
});
