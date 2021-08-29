import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: "driver_license" })
  driverLicense: string;

  @Column({ name: "is_admin" })
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
