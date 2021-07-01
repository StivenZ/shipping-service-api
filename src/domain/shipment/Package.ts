import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import Shipment from './Shipment';

@Entity()
export default class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true
  })
  description: string;

  @Column({
    type: 'double precision',
    name: 'weight'
  })
  weight: number;

  @Column({
    type: 'double precision',
    name: 'height'
  })
  height: number;

  @Column({
    type: 'double precision',
    name: 'width'
  })
  width: number;

  @Column({
    type: 'double precision',
    name: 'length' // Depth
  })
  length: number;

  @Column({
    type: 'integer',
    name: 'units'
  })
  units: number;

  @ManyToOne(() => Shipment, (shipment) => shipment.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'shipment_id'
  })
  shipment: Shipment;
}
