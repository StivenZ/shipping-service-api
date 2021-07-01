import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export default class ValientaStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'value'
  })
  value: string;
}
