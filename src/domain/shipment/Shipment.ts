import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import Package from './Package';
// eslint-disable-next-line import/no-cycle
import PaymentType from './PaymentType';
// eslint-disable-next-line import/no-cycle
import Contact from './Contact';
// eslint-disable-next-line import/no-cycle
import ShippingCarrier from './ShippingCarrier';
// eslint-disable-next-line import/no-cycle
import ShipmentStatus from './ShipmentStatus';

@Entity()
export default class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'external_id'
  })
  externalId: string;

  @Column({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date;

  @Column({
    type: 'text',
    name: 'tracking_number',
    nullable: true
  })
  trackingNumber: string;

  @Column({
    type: 'text',
    name: 'tracking_pdf',
    nullable: true
  })
  trackingPdf: string;

  @Column({
    type: 'double precision',
    name: 'cost_from_shipping_carrier',
    nullable: true,
  })
  costFromShippingCarrier: number;

  @Column({
    type: 'double precision',
    name: 'cost_charged_by_valienta',
    nullable: true,
  })
  costChargedByValienta: number;

  @Column({
    type: 'json',
    name: 'details',
    nullable: true
  })
  details: object;

  @Column({
    type: 'text',
    name: 'pickup_number',
    nullable: true
  })
  pickupNumber: string;

  @OneToMany(() => Package, (pack) => pack.shipment, {
    cascade: true,
  })
  packages: Package[];

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'payment_type_id'
  })
  paymentType: PaymentType;

  @ManyToOne(() => Contact, (contact) => contact.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'receiver'
  })
  receiver: Contact;

  @ManyToOne(() => Contact, (contact) => contact.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'sender'
  })
  sender: Contact;

  @Column({
    type: 'text',
    name: 'owner_id'
  })
  ownerId: string;

  @ManyToOne(() => ShippingCarrier, (shippingCarrier) => shippingCarrier.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'shipping_carrier_id'
  })
  shippingCarrier: ShippingCarrier;

  @OneToMany(() => ShipmentStatus, (shipmentStatus) => shipmentStatus.shipment, {
    cascade: true,
  })
  shipmentStatuses: ShipmentStatus[];
}
