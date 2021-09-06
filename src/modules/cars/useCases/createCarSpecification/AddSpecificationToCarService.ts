import Car from "@modules/cars/infra/typeorm/entities/Car";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository as ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  carId: string;
  specificationsId: string[];
}
@injectable()
export default class AddSpecificationToCarService {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository
  ) {}

  public async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const carsExists = await this.carsRepository.findById(carId);

    if (!carsExists) {
      throw new AppError("This car does not exists!");
    }

    const specifications = await this.specificationsRepository.findByIds(specificationsId);

    carsExists.specifications = specifications;

    await this.carsRepository.create(carsExists);

    return carsExists;
  }
}
