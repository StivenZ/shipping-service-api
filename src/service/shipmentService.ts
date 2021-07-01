import Shipment from '../domain/shipment/Shipment';
import shipmentRepository from '../repository/shipmentRepository';
import ServiceError from '../utils/ServiceError';

async function getShipmentById(shipmentId: string): Promise<Shipment> {
  const shipment: Shipment = await shipmentRepository.getById(shipmentId);

  return shipment;
}

async function getAllShipments(): Promise<Shipment[]> {
  const shipments: Shipment[] = await shipmentRepository.getAll();

  return shipments;
}

async function updateShipment(counterNum: string, shipmentId: string) {
    // validations:
    if (typeof counterNum !== 'number') {
      throw new ServiceError('Order id must be string');
    }

    // Upsert
    await shipmentRepository.upsert(counterNum, shipmentId);
  }

export default {
  getShipmentById,
  getAllShipments,
  updateShipment
};
