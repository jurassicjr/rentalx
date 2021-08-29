import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../entities/User";

export default interface IUsersRepository {
  create(createUserData: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findByID(id: string): Promise<User | undefined>;
}
