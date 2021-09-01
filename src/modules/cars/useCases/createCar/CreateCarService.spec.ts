import FakeCarsRepository from "@modules/cars/repositories/fakeRepositories/FakeCarsRepository";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";

import { AppError } from "@shared/errors/AppError";

import CreateCarService from "./CreateCarService";

let createCarService: CreateCarService;
let carsRepository: ICarsRepository;

describe("Car creation", () => {
  beforeEach(() => {
    carsRepository = new FakeCarsRepository();
    createCarService = new CreateCarService(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarService.execute({
      brand: "brand",
      categoryId: "category",
      dailyRate: 100,
      description: "car description",
      fineAmount: 60,
      licensePlate: "ABC-123",
      name: "car name",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with a license plate that was already registered", () => {
    expect(async () => {
      await createCarService.execute({
        brand: "brand",
        categoryId: "category",
        dailyRate: 100,
        description: "car description",
        fineAmount: 60,
        licensePlate: "ABC-123",
        name: "car 1",
      });

      await createCarService.execute({
        brand: "brand",
        categoryId: "category",
        dailyRate: 100,
        description: "car description",
        fineAmount: 60,
        licensePlate: "ABC-123",
        name: "car 2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should  be able to create a car having the attribute available as true by default", async () => {
    const car = await createCarService.execute({
      brand: "brand",
      categoryId: "category",
      dailyRate: 100,
      description: "car description",
      fineAmount: 60,
      licensePlate: "ABC-123",
      name: "car 1",
    });

    expect(car.available).toBe(true);
  });
});
