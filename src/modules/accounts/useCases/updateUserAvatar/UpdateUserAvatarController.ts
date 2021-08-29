import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarService from "./UpdateUserAvatarService";

export default class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userID = request.user.id;
    const avatarFile = request.file?.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute({ userID, avatarFile });

    return response.status(200).send();
  }
}
