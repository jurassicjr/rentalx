import FakeRentalsRepository from "@modules/rentals/repositories/fakes/FakeRentalsRepository";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import dayjs from "dayjs";

import { AppError } from "@shared/errors/AppError";

import CreateRentalService from "./CreateRentalService";

let createRentalService: CreateRentalService;
let rentalsRepository: IRentalsRepository;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new FakeRentalsRepository();
    createRentalService = new CreateRentalService(rentalsRepository);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalService.execute({
      userId: "123456",
      carId: "121212",
      expectedReturnDate: dayjs(new Date()).add(25, "hours").toDate(),
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental to a user that already has an open rental", async () => {
    await createRentalService.execute({
      userId: "123456",
      carId: "121212",
      expectedReturnDate: dayjs(new Date()).add(25, "hours").toDate(),
    });

    expect(async () => {
      await createRentalService.execute({
        userId: "123456",
        carId: "141414",
        expectedReturnDate: dayjs(new Date()).add(25, "hours").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with a car that are already in an open rental", async () => {
    await createRentalService.execute({
      userId: "123456",
      carId: "121212",
      expectedReturnDate: dayjs(new Date()).add(25, "hours").toDate(),
    });

    expect(async () => {
      await createRentalService.execute({
        userId: "654321",
        carId: "121212",
        expectedReturnDate: dayjs(new Date()).add(25, "hours").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with a invalid expected return date", async () => {
    expect(async () => {
      await createRentalService.execute({
        userId: "654321",
        carId: "121212",
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
