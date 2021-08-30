import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driverLicense, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ name, email, driverLicense, password });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findByID(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }
}
