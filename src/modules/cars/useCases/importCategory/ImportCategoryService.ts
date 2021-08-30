import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesrepository";
import csvParse from "csv-parse";
import * as fs from "fs";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export default class ImportCategoryService {
  constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File | undefined): Promise<void> {
    if (!file) throw new AppError("You need to provided a files with name and description", 401);
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}
