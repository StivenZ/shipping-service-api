import minutos99Gateway from '../gateway/99minutosGateway';
import Shipment from '../domain/shipment/Shipment';
import shipmentService from './shipmentService';

async function shippingRates(shipmentId: string) {
  const shipment: Shipment = await shipmentService.getShipmentById(shipmentId,);

  let requestBodies: {packageId: string, body: Object};

  for (const boxes of shipment.packages) {
    const body = await minutos99Gateway.pricingConsult(boxes, shipment.sender, shipment.receiver);

    requestBodies.packageId = boxes.id;
    requestBodies.body = body;
  }

  return requestBodies;
}

export default {
  shippingRates
};
