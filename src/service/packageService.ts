import Package from '../domain/shipment/Package';
import packageRepository from '../repository/packageRepository';

async function getPackagesbyShipmentId(shipmentId: string): Promise<Package[]> {
  const packages: Package[] = await packageRepository.getByShipmentId(shipmentId);

  return packages;
}

export default {
  getPackagesbyShipmentId
};
