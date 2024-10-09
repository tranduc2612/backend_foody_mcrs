import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Merchandise } from "./merchandise.entity";
import { Recipes } from "./recipes.entity";
@Entity({ name: "detail_recipes" })
export class DetailRecipes {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    numberCount!: number;

    @ManyToOne(() => Recipes, (r) => r.id)
    @JoinColumn({ name: "idRescipes", foreignKeyConstraintName: 'FK_DetailRecipes_Recipes' })
    idRescipes!: Recipes;

    @ManyToOne(() => Merchandise, (r) => r.id)
    @JoinColumn({ name: "idMerchandise", foreignKeyConstraintName: 'FK_DetailRecipes_Merchandise' })
    idMerchandise!: Merchandise;
}
