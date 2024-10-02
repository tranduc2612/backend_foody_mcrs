import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity({ name: "users" })
export class Users {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ type: "text", nullable: true })
  refreshToken?: string;

  @Column({ type: "text", nullable: true })
  accessToken?: string;
}
