import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Merchandise } from "./merchandise.entity";
import { Users } from "./user.entity";
@Entity({ name: "cart_detail" })
export class CartDetail {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    numberCount!: number;

    @Column()
    total!: number;

    @ManyToOne(() => Users, (rec) => rec.cart)
    @JoinColumn({ name: "idUser", foreignKeyConstraintName: 'FK_CartDetail_User' })
    idUser!: Users;

    @ManyToOne(() => Merchandise, (rec) => rec.cart)
    @JoinColumn({ name: "idMerchandise", foreignKeyConstraintName: 'FK_CartDetail_Merchandise' })
    idMerchandise!: Merchandise;

    
}
