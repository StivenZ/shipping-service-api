import ShippingCarrier from '../domain/shipment/ShippingCarrier';
import carrierRepository from '../repository/carrierRepository';

async function getAllCarriers(): Promise<ShippingCarrier[]> {
  const carriers: ShippingCarrier[] = await carrierRepository.getAll();

  return carriers;
}

export default {
  getAllCarriers,
};
