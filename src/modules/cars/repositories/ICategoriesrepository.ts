import Category from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
}

export { ICreateCategoryDTO, ICategoriesRepository };
