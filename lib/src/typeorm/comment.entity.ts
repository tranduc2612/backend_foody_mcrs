import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Recipes } from "./recipes.entity";
import { Users } from "./user.entity";
@Entity({ name: "Comment" })
export class Comment {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column({ type: "text" })
    content!: string;
  
    @ManyToOne(() => Users, (rec) => rec.username)
    @JoinColumn({ name: "idUser" })
    idUser!: Users;

    @ManyToOne(() => Recipes, (rec) => rec.id)
    @JoinColumn({ name: "idRecipe" })
    idRecipe!: Recipes;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;
}
