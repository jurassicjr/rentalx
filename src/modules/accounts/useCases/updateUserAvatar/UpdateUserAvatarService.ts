import { AppError } from "@errors/AppError";
import User from "@modules/accounts/infra/typeorm/entities/User";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

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
