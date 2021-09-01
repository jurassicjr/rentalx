import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

import Category from "./Category";

@Entity()
export default class Car {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: "daily_rate" })
  dailyRate: number;

  @Column()
  available: boolean;

  @Column({ name: "license_plate" })
  licensePlate: string;

  @Column({ name: "fine_amount" })
  fineAmount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column({ name: "category_id" })
  categoryId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.available = true;
      this.createdAt = new Date();
    }
  }
}
