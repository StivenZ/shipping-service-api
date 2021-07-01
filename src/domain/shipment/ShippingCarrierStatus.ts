import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import ShippingCarrier from './ShippingCarrier';
// eslint-disable-next-line import/no-cycle
import ValientaStatus from './ValientaStatus';

@Entity()
export default class ShippingCarrierStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'value'
  })
  value: string;

  @ManyToOne(() => ShippingCarrier, (shippingCarrier) => shippingCarrier.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'shipping_carrier_id'
  })
  carrier: ShippingCarrier;

  @ManyToOne(() => ValientaStatus, (valientaStatus) => valientaStatus.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'valienta_status_id'
  })
  valientaStatus: ValientaStatus;
}
