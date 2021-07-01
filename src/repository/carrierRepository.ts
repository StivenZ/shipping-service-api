import { getManager } from 'typeorm';
import ShippingCarrier from '../domain/shipment/ShippingCarrier';

async function getAll(): Promise<ShippingCarrier[]> {
  const carriers: ShippingCarrier[] = await getManager().getRepository(ShippingCarrier).find({});

  return carriers;
}

export default {
  getAll,
};
