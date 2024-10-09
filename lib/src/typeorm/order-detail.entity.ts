import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./user.entity";
import { Order } from "./order.entity";
import { Merchandise } from "./merchandise.entity";
@Entity({ name: "order_detail" })
export class OrderDetail {
    @PrimaryColumn()
    id: string = uuidv4();
  
    @Column()
    numberCount!: number;

    @Column()
    total!: number;

    @Column({ type: "timestamp", nullable: true })
    createdAt!: Date;

    @ManyToOne(() => Order, (r) => r.orderDetailId)
    @JoinColumn({ name: "orderId", foreignKeyConstraintName: 'FK_Detail_Order_Order' })
    orderId!: Order;

    @ManyToOne(() => Merchandise, (r) => r.detailOrder)
    @JoinColumn({ name: "merchandiseId", foreignKeyConstraintName: 'FK_OrderDetail_Merchandise' })
    merchandiseId!: Merchandise;
}
