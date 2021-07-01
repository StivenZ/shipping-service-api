import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class ActionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'value'
  })
  value: string;

  constructor(value: string, createdAt: Date, id?: string) {
    this.id = id;
    this.value = value;
  }
}
