import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import ActionType from './ActionType';
// eslint-disable-next-line import/no-cycle
import ShipmentStatus from '../shipment/ShipmentStatus';

@Entity()
export default class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'description'
  })
  description: string;

  @Column({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date;

  @ManyToOne(() => ActionType, (actionType) => actionType.id, {
    nullable: false
  })
  @JoinColumn({
    name: 'action_type_id'
  })
  actionType: ActionType;

  @ManyToOne(() => ShipmentStatus, (shipmentStatus) => shipmentStatus.id, {
    nullable: false
  })
  @JoinColumn({
    name: 'shipment_status_id'
  })
  shipmentStatus: ShipmentStatus;

  constructor(description: string, createdAt: Date, actionType: ActionType, shipmentStatus: ShipmentStatus, id?: string) {
    this.id = id;
    this.description = description;
    this.createdAt = createdAt;
    this.actionType = actionType;
    this.shipmentStatus = shipmentStatus;
  }
}
