import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesrepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryService {
  constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("This category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}
