import Specification from "@modules/cars/infra/typeorm/entities/Specification";

import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

export default class FakeSpecificationsRepository implements ISpecificationRepository {
  specifications: Specification[] = [];

  public async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { description, name });
    this.specifications.push(specification);
    return specification;
  }
  public async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name);
  }
  public async findById(id: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.id === id);
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) => ids.includes(specification.id));
  }
}
