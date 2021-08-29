import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import User from "../../entities/User";
import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
  userID: string;
  avatarFile?: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

  public async execute({ userID, avatarFile }: IRequest): Promise<void> {
    const user = (await this.usersRepository.findByID(userID)) as User;

    if (!avatarFile) throw new AppError("Avatar must be send!", 401);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
