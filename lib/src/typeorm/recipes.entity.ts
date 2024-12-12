import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./user.entity";
import { Step } from "./step.entity";
import { CommentRecipes } from "./comment.entity";
import { Season } from "./season.entity";
import { RecipesType } from "./recipes-type.entity";
import { Country } from "./country.entity";
import { DetailRecipes } from "./detail-recipes.entity";
import { RateDetail } from "./rate_detail.entity";
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

  @Column({ type: "timestamp", nullable: true })
  createdAt!: Date;

  // @ManyToOne(() => Users, (users) => users.recipes)
  // @JoinColumn({ name: "createdBy", foreignKeyConstraintName: 'FK_Recipes_Users' })
  // createdBy!: Users;
  @Column()
  createdBy!: string;

  @Column()
  isDelete: boolean = false;

  @OneToMany(() => Step, (step) => step.id)
  @JoinColumn({ name: "idSteps", foreignKeyConstraintName: 'FK_Recipes_Step' })
  idSteps!: Step[];

  @OneToMany(() => CommentRecipes, (rec) => rec.idRecipe)
  @JoinColumn({ name: "commentIds", foreignKeyConstraintName: 'FK_Recipes_CommentRecipes' })
  commentIds!: CommentRecipes[];

  @ManyToOne(() => Season, (s) => s.idRescipes)
  @JoinColumn({ name: "idSeason", foreignKeyConstraintName: 'FK_Recipes_Season' })
  idSeason!: Season;

  @ManyToOne(() => RecipesType, (s) => s.idRescipes)
  @JoinColumn({ name: "idRecipesType", foreignKeyConstraintName: 'FK_Recipes_RecipesType' })
  idRecipesType!: RecipesType;

  @ManyToOne(() => Country, (s) => s.idRescipes)
  @JoinColumn({ name: "idCountry", foreignKeyConstraintName: 'FK_Recipes_Country' })
  idCountry!: Country;

  @OneToMany(() => RateDetail, (rateDetail) => rateDetail.id)
  @JoinColumn({ name: "idRateDetails", foreignKeyConstraintName: 'FK_Recipes_RateDetail' })
  rate!: RateDetail[];

  @OneToMany(() => DetailRecipes, (r) => r.idRescipes)
  @JoinColumn({ name: "idDetailRecipes", foreignKeyConstraintName: 'FK_Recipes_DetailRecipes' })
  idDetailRecipes!: DetailRecipes[];
}
