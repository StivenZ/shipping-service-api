import {
  Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, OneToMany,
} from 'typeorm';

@Entity()
export default class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'text',
      name: 'discount_description',
      nullable: true
    })
    discountDescription: string;

    @Column({
      type: 'double precision',
      name: 'discount_value',
      nullable: true
    })
    discountValue: number;

    @Column({
      type: 'text',
      name: 'shipping_tracking_number',
      nullable: true
    })
    shippingTrackingNumber: string;

    @Column({
      type: 'text',
      name: 'shipping_tracking_pdf'
    })
    shippingTrackingPdf: string;
}
