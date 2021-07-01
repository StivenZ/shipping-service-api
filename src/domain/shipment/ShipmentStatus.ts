import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import Actions from '../actions/Action';
// eslint-disable-next-line import/no-cycle
import Shipment from './Shipment';
// eslint-disable-next-line import/no-cycle
import ShipmentCarrierStatus from './ShippingCarrierStatus';

@Entity()
export default class ShipmentStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date;

  @Column({
    type: 'text',
    name: 'comments',
    nullable: true
  })
  comments: string;

  @OneToMany(() => Actions, (actions) => actions.shipmentStatus, {
    cascade: true,
  })
  actions: Actions[];

  @ManyToOne(() => Shipment, (shipment) => shipment.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'shipment_id'
  })
  shipment: Shipment;

  @ManyToOne(() => ShipmentCarrierStatus, (status) => status.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'status_id'
  })
  status: ShipmentCarrierStatus;
}
