import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./user.entity";
import { OrderDetail } from "./order-detail.entity";
import { Recipes } from "./recipes.entity";
@Entity({ name: "RateDetail" })
export class RateDetail {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    ratio!: string;

    @Column()
    userId!: string;

    @Column({ type: "timestamp", nullable: true })
    createdAt: Date = new Date();

    @Column({ type: "timestamp"})
    updateAt!: Date;

    @ManyToOne(() => Recipes, (r) => r.rate)
    @JoinColumn({ name: "idRecipe", foreignKeyConstraintName: 'FK_RateDetail_Recipes' })
    idRecipe!: Recipes;
}
