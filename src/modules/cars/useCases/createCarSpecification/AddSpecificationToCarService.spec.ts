import FakeCarsRepository from "@modules/cars/repositories/fakeRepositories/FakeCarsRepository";
import FakeSpecificationsRepository from "@modules/cars/repositories/fakeRepositories/FakeSpecificationsRepository";

import { AppError } from "@shared/errors/AppError";

import AddSpecificationToCarService from "./AddSpecificationToCarService";

let addSpecificationToCarService: AddSpecificationToCarService;
let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;

describe("Create car specification", () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    addSpecificationToCarService = new AddSpecificationToCarService(fakeCarsRepository, fakeSpecificationsRepository);
  });

  it("should be able to create a new car specification", async () => {
    const car = await fakeCarsRepository.create({
      brand: "brand",
      categoryId: "category",
      dailyRate: 100,
      description: "car description",
      fineAmount: 60,
      licensePlate: "ABC-123",
      name: "car 1",
    });

    const specification = await fakeSpecificationsRepository.create({
      name: "test",
      description: "test",
    });

    const specificationsId = [specification.id];

    const carWithSpecifications = await addSpecificationToCarService.execute({ carId: car.id, specificationsId });

    expect(carWithSpecifications.id).toEqual(car.id);
    expect(carWithSpecifications.specifications).toHaveLength(1);
    expect(carWithSpecifications.specifications).toEqual([specification]);
  });

  it("should not be able to add specification a non-existing car", async () => {
    const carId = "123456678";
    const specificationsId = ["54321"];

    await expect(addSpecificationToCarService.execute({ carId, specificationsId })).rejects.toBeInstanceOf(AppError);
  });
});
