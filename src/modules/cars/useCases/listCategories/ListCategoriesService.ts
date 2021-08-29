import { inject, injectable } from "tsyringe";

import Category from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesrepository";

@injectable()
export default class ListCategoriesService {
  constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
