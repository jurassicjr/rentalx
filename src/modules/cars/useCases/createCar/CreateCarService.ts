import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
export default class CreateCarService {
  constructor(@inject("CarsRepository") private carsRepository: ICarsRepository) {}

  public async execute({
    name,
    description,
    dailyRate,
    fineAmount,
    brand,
    licensePlate,
    categoryId,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);

    if (carAlreadyExists) throw new AppError("Car already exists!");

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      fineAmount,
      brand,
      licensePlate,
      categoryId,
    });

    return car;
  }
}
