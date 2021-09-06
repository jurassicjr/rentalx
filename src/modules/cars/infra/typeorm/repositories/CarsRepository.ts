import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ where: { licensePlate } });
  }

  public async findAvailable(brand?: string, categoryId?: string, name?: string): Promise<Car[]> {
    const query = this.repository.createQueryBuilder("c").where("c.available = :available", { available: true });

    if (brand) {
      query.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      query.andWhere("c.name = :name", { name });
    }

    if (categoryId) {
      query.andWhere("c.categoryId = :categoryId", { categoryId });
    }

    return query.getMany();
  }

  public async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }
}
