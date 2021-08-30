import { AppError } from "@errors/AppError";
import FakeCategoriesRepository from "@modules/cars/repositories/fakeRepositories/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesrepository";

import CreateCategoryService from "./CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepository: ICategoriesRepository;

describe("Testing the creation of category", () => {
  beforeEach(() => {
    categoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(categoriesRepository);
  });

  it("should create a new category", async () => {
    const category = { name: "Category Test", description: "Category description test" };
    await createCategoryService.execute(category);
    const createdCategoty = await categoriesRepository.findByName(category.name);

    expect(createdCategoty).toHaveProperty("id");
  });

  it("should not be able to create a new category with a name that already exists in a category", async () => {
    const category = { name: "Category Test", description: "Category description test" };
    await createCategoryService.execute(category);

    await expect(createCategoryService.execute(category)).rejects.toBeInstanceOf(AppError);
  });
});
