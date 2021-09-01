import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import ICarsRepository from "../ICarsRepository";

export default class FakeCarsRepository implements ICarsRepository {
  private cars: Car[] = [];

  public async create({
    name,
    licensePlate,
    brand,
    fineAmount,
    description,
    dailyRate,
    categoryId,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      licensePlate,
      brand,
      fineAmount,
      description,
      dailyRate,
      categoryId,
    });

    this.cars.push(car);

    return car;
  }

  public async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}
