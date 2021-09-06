import Specification from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findById(id: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
