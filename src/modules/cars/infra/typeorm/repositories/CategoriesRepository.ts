import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesrepository";
import { getRepository, Repository } from "typeorm";

import Category from "../entities/Category";

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      name,
    });
    return category;
  }
}
