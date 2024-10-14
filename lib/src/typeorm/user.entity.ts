import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { CartDetail } from "./cart_detail.entity";
import { CommentRecipes } from "./comment.entity";
import { Recipes } from "./recipes.entity";
import { Order } from "./order.entity";
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

  // @OneToMany(() => Recipes, (rec) => rec.createdBy)
  // @JoinColumn({foreignKeyConstraintName: 'FK_User_Recipes'})
  // recipes!: Recipes[];

  // @OneToMany(() => CommentRecipes, (rec) => rec.idUser)
  // @JoinColumn({ name: "commentIds",foreignKeyConstraintName: 'FK_User_CommentRecipes' })
  // commentIds!: CommentRecipes[];

  // @OneToMany(() => Order, (rec) => rec.idUser)
  // @JoinColumn({ name: "orderIds",foreignKeyConstraintName: 'FK_User_Order' })
  // orderIds!: Order[];

  // @OneToMany(() => CartDetail, (rec) => rec.idUser)
  // @JoinColumn({ name: "cart",foreignKeyConstraintName: 'FK_User_CartDetail' })
  // cart!: CartDetail[];
}
