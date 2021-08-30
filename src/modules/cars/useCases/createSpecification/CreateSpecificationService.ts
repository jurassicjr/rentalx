import { AppError } from "@errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationService {
  constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) throw new AppError("This specification already exists");

    this.specificationsRepository.create({ name, description });
  }
}
