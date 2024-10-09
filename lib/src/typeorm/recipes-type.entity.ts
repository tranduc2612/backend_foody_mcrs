import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Recipes } from "./recipes.entity";
@Entity({ name: "recipes_type" })
export class RecipesType {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    content!: string;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;

    @Column()
    createdBy!: string;

    @OneToMany(() => Recipes, (r) => r.idRecipesType)
    @JoinColumn({ name: "idRescipes", foreignKeyConstraintName: 'FK_RecipesType_Recipes' })
    idRescipes!: Recipes[];
}
