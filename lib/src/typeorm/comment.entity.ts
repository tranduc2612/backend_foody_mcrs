import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Recipes } from "./recipes.entity";
import { Users } from "./user.entity";
@Entity({ name: "comment_recipes" })
export class CommentRecipes {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column({ type: "text" })
    content!: string;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;
  
    // @ManyToOne(() => Users, (rec) => rec.username)
    // @JoinColumn({ name: "idUser", foreignKeyConstraintName: 'FK_CommentRecipes_Users' })
    @Column({ type: "text" })
    idUser!: Users;

    @ManyToOne(() => Recipes, (rec) => rec.id)
    @JoinColumn({ name: "idRecipe", foreignKeyConstraintName: 'FK_CommentRecipes_Recipes' })
    idRecipe!: Recipes;

    
}
