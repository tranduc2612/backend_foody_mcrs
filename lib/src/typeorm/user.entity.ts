import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Recipes } from "./recipes.entity";
import { Comment } from "./comment.entity";
@Entity({ name: "users" })
export class Users {
  @PrimaryColumn()
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({ default: "USER" })
  role!: string;

  @Column({ type: "timestamp", nullable: true })
  DOB!: Date;

  @Column({ type: "text", nullable: true })
  avatar?: string;

  @Column({ type: "text", nullable: true })
  refreshToken?: string;

  @Column({ type: "text", nullable: true })
  accessToken?: string;

  @Column({ type: "timestamp", nullable: true })
  createdAt!: Date;

  @OneToMany(() => Recipes, (rec) => rec.createdBy)
  recipes!: Recipes[];

  @OneToMany(() => Comment, (rec) => rec.idUser)
  @JoinColumn({ name: "commentIds" })
  commentIds!: Comment[];
}
