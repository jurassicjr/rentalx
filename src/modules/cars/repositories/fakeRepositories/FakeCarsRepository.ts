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

  public async findAvailable(brand?: string, categoryId?: string, name?: string): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => {
      if (car.available === true) {
        if (
          (brand && car.brand !== brand) ||
          (categoryId && car.categoryId !== categoryId) ||
          (name && car.name !== name)
        ) {
          return null;
        }
        return car;
      }
      return null;
    });

    return availableCars;
  }

  public async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
