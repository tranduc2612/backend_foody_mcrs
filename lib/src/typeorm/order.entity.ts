import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./user.entity";
import { OrderDetail } from "./order-detail.entity";
@Entity({ name: "order" })
export class Order {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column({ type: "text" })
    content!: string;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;

    @ManyToOne(() => Users, (r) => r.orderIds)
    @JoinColumn({ name: "idUsers", foreignKeyConstraintName: 'FK_Order_Users' })
    idUser!: Users;

    @OneToMany(() => OrderDetail, (r) => r.orderId)
    @JoinColumn({ name: "orderDetailId", foreignKeyConstraintName: 'FK_Order_Recipes' })
    orderDetailId!: OrderDetail[];
}
