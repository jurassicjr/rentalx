import { Router } from "express";

import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import CreateSpecificationController from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const createSpecificationSController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.post("/", ensureAuthenticate, createSpecificationSController.handle);

export default specificationRoutes;
