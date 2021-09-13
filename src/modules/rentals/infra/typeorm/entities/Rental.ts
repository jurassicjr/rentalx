import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("rentals")
export default class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  carId: string;

  userId: string;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column({ name: "expected_return_date" })
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn({ name: "created_at" })
  createAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.createAt = new Date();
    }
  }
}
