import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Recipes } from "./recipes.entity";
@Entity({ name: "step" })
export class Step {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    title!: string;
  
    @Column({ type: "text" })
    description!: number;
  
    @Column()
    stepCount!: number;
  
    @ManyToOne(() => Recipes, (rec) => rec.idSteps)
    @JoinColumn({ name: "idRecipe", foreignKeyConstraintName: 'FK_Step_Recipes' })
    idRecipe!: Recipes;
}
