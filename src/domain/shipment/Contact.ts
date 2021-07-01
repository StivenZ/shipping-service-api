import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export default class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'name'
  })
  name: string;

  @Column({
    type: 'text',
    name: 'phone'
  })
  phone: string;

  @Column({
    type: 'text',
    name: 'doc_type',
    nullable: true
  })
  docType: string;

  @Column({
    type: 'text',
    name: 'doc_number',
    nullable: true
  })
  docNumber: string;

  @Column({
    type: 'text',
    name: 'email',
    nullable: true
  })
  email: string;

  @Column({
    type: 'text',
    name: 'street1'
  })
  street1: string;

  @Column({
    type: 'text',
    name: 'street2'
  })
  street2: string;

  @Column({
    type: 'text',
    name: 'indications'
  })
  indications: string;

  @Column({
    type: 'text',
    name: 'city_code'
  })
  cityCode: string;

  @Column({
    type: 'text',
    name: 'postal_code'
  })
  postalCode: string;

  @Column({
    type: 'text',
    name: 'country'
  })
  country: string;
}
