import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity({ name: "users" })
export class Users {
  @PrimaryColumn()
  id: String = uuidv4();

  @Column()
  username!: String;

  @Column()
  password!: String;

  @Column()
  email!: String;

  @Column({ default: 'USER' })
  role!: String;

  @Column({ type: "timestamp", nullable: true })
  DOB!: Date;

  @Column({ type: "text", nullable: true })
  avatar?: String;

  @Column({ type: "text", nullable: true })
  refreshToken?: String;

  @Column({ type: "text", nullable: true })
  accessToken?: String;

  @Column({ type: "timestamp", nullable: true })
  createdAt!: Date;
}
