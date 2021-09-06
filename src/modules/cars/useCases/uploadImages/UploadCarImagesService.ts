import ICarsImagesRepository from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
export default class UploadCarImagesService {
  constructor(@inject("CarsImagesRepository") private carsImagesRepository: ICarsImagesRepository) {}
  public async execute({ carId, imagesName }: IRequest): Promise<void> {
    imagesName.map(async (image) => {
      await this.carsImagesRepository.create(carId, image);
    });
  }
}
