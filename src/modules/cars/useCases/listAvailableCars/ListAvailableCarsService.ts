import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  carName?: string;
  categoryId?: string;
  brand?: string;
}

@injectable()
export default class ListAvailableCarsService {
  constructor(@inject("CarsRepository") private carsRepository: ICarsRepository) {}

  public async execute({ categoryId, brand, carName }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, categoryId, carName);

    return cars;
  }
}
