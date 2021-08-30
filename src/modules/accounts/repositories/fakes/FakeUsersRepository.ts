import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import User from "@modules/accounts/infra/typeorm/entities/User";
import { v4 } from "uuid";

import IUsersRepository from "../IUsersRepository";

export default class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({ driverLicense, email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      driverLicense,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findByID(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
