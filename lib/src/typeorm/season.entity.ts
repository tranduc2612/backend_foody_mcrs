import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Recipes } from "./recipes.entity";
@Entity({ name: "season" })
export class Season {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    content!: string;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;

    @Column()
    createdBy!: string;

    @OneToMany(() => Recipes, (r) => r.idSeason)
    @JoinColumn({ name: "idRescipes", foreignKeyConstraintName: 'FK_Season_Recipes' })
    idRescipes!: Recipes[];
}
