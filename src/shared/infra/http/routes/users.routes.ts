import uploadConfig from "@config/upload";
import CreateUserController from "@modules/accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import ensureAuthenticate from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export default usersRoutes;
