import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import IRentalsRepository from "@modules/rentals/repositories/IRentalsRepository";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}
@injectable()
export default class CreateRentalService {
  constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository) {}

  public async execute({ userId, carId, expectedReturnDate }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(carId);

    if (carUnavailable) {
      throw new AppError("This car is not available");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId);

    if (rentalOpenToUser) {
      throw new AppError("This user already has a rental in progress");
    }

    const compare = dayjs(expectedReturnDate).diff(new Date(), "hours");

    if (compare < 24) throw new AppError("The minimun interval to rent a car is 24 hours");

    const rental = await this.rentalsRepository.create({ userId, carId, expectedReturnDate });

    return rental;
  }
}
