import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCases/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";

import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureAuthenticate,
  ensureIsAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export default categoriesRoutes;
