import { AppError } from "@errors/AppError";
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import FakeUsersRepository from "@modules/accounts/repositories/fakes/FakeUsersRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";

import CreateUserService from "../createUser/CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";

let authenticateUserService: AuthenticateUserService;
let fakeUsersRepository: IUsersRepository;
let createUserService: CreateUserService;

describe("Authenticate user", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driverLicense: "000123",
      email: "user@mail.com",
      name: "john doe",
      password: "123456",
    };

    await createUserService.execute(user);

    const result = await authenticateUserService.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existing user", async () => {
    await expect(authenticateUserService.execute({ email: "false@email.com", password: "123" })).rejects.toBeInstanceOf(
      AppError
    );
  });

  it("should not be able to authenticate a user with a wrong password", async () => {
    const user: ICreateUserDTO = {
      driverLicense: "000123",
      email: "user@mail.com",
      name: "john doe",
      password: "123456",
    };

    await createUserService.execute(user);

    await expect(
      authenticateUserService.execute({ email: "user@mail.com", password: "incorrect" })
    ).rejects.toBeInstanceOf(AppError);
  });
});
