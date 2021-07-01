import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class ShippingCarrier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'name'
  })
  name: string;

  constructor(name: string, id?: string) {
    this.id = id;
    this.name = name;
  }
}
