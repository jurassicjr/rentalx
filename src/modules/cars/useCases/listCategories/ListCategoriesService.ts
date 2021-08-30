import Category from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesrepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListCategoriesService {
  constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
