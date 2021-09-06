import CarImage from "../infra/typeorm/entities/CarImage";

export default interface ICarsImagesRepository {
  create(carId: string, imageName: string): Promise<CarImage>;
}
