import ICarsImagesRepository from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";

import CarImage from "../entities/CarImage";

export default class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  public async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = this.repository.create({
      carId,
      imageName,
    });

    await this.repository.save(carImage);
    return carImage;
  }
}
