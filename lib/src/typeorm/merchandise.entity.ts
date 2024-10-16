import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CartDetail } from "./cart_detail.entity";
import { DetailRecipes } from "./detail-recipes.entity";
import { OrderDetail } from "./order-detail.entity";
@Entity({ name: "merchandise" })
export class Merchandise {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column()
    createdBy!: string;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;

    @OneToMany(() => DetailRecipes, (r) => r.idMerchandise)
    @JoinColumn({ name: "idDetailRecipes", foreignKeyConstraintName: 'FK_Merchandise_DetailRecipes' })
    idDetailRecipes!: DetailRecipes[];

    // @OneToMany(() => CartDetail, (rec) => rec.idMerchandise)
    // @JoinColumn({ name: "cart",foreignKeyConstraintName: 'FK_Merchandise_CartDetail' })
    // cart!: CartDetail[];

    // @OneToMany(() => OrderDetail, (rec) => rec.orderId)
    // @JoinColumn({ name: "detailOrder",foreignKeyConstraintName: 'FK_Merchandise_CartDetail' })
    // detailOrder!: OrderDetail[];
}
