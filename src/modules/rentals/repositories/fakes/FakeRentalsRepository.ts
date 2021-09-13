import ICreateRentalDTO from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import IRentalsRepository from "../IRentalsRepository";

export default class FakeRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  public async create({ carId, expectedReturnDate, userId }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      carId,
      userId,
      expectedReturnDate,
      startDate: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  public async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.carId === carId && !rental.endDate);
  }

  public async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.carId === userId && !rental.endDate);
  }
}
