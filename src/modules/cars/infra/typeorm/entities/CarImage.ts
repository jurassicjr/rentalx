import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

@Entity({ name: "cars_image" })
export default class CarImage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: "car_id" })
  carId: string;

  @Column({ name: "image_name" })
  imageName: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
