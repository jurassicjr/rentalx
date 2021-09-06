import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import ensureIsAdmin from "../middlewares/ensureIsAdmin";

const createCarController = new CreateCarController();

const carsRoutes = Router();

carsRoutes.post("/", ensureAuthenticate, ensureIsAdmin, createCarController.handle);

export default carsRoutes;
