import uploadConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import AddSpecificationToCarController from "@modules/cars/useCases/createCarSpecification/AddSpecificationToCarController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import UploadCarImagesController from "@modules/cars/useCases/uploadImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";

import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const addSpecificationToCarController = new AddSpecificationToCarController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload("./tmp/carsImages"));

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.patch("/specifications/:id", ensureAuthenticate, ensureIsAdmin, addSpecificationToCarController.handle);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticate,
  ensureIsAdmin,
  uploadCarImages.array("images"),
  uploadCarImagesController.handle
);

export default carsRoutes;
