import CreateSpecificationController from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";

import ensureAuthenticate from "@shared/infra/http/middlewares/ensureAuthenticated";

const createSpecificationSController = new CreateSpecificationController();

const specificationRoutes = Router();

specificationRoutes.post("/", ensureAuthenticate, createSpecificationSController.handle);

export default specificationRoutes;
