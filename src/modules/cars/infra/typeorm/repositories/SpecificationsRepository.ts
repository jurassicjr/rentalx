import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, In, Repository } from "typeorm";

import Specification from "../entities/Specification";

export default class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  public async findById(id: string): Promise<Specification> {
    return this.repository.findOne(id);
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }
}
