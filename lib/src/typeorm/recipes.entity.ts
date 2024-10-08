import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./user.entity";
import { Step } from "./step.entity";
import { Comment } from "./comment.entity";
@Entity({ name: "recipes" })
export class Recipes {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column()
  calories!: number;

  @Column()
  sodium!: number;

  @Column()
  fat!: number;

  @Column()
  carbs!: number;

  @Column()
  fiber!: number;

  @Column()
  timeCook!: number;

  @ManyToOne(() => Users, (users) => users.recipes)
  @JoinColumn({ name: "createdBy" })
  createdBy!: Users;

  @Column({ type: "timestamp", nullable: true })
  createdAt!: Date;

  @OneToMany(() => Step, (step) => step.id)
  @JoinColumn({ name: "idSteps" })
   idSteps!: Step[];

   @OneToMany(() => Comment, (rec) => rec.idRecipe)
   @JoinColumn({ name: "commentIds" })
    commentIds!: Comment[];
}
