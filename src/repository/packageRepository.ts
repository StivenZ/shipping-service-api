import { getManager } from 'typeorm';
import Package from '../domain/shipment/Package';

async function getByShipmentId(shipmentId: string): Promise<Package[]> {
  const packages = await getManager().getRepository(Package).find({ where: { shipment_id: shipmentId } });

  return packages;
}

export default {
  getByShipmentId,
};
