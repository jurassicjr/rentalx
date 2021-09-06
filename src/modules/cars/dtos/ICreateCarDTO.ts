import Specification from "../infra/typeorm/entities/Specification";

export default interface ICreateCarDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
  id?: string;
}
