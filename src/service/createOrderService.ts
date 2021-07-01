import minutos99Gateway from '../gateway/99minutosGateway';
import Shipment from '../domain/shipment/Shipment';
import shipmentService from './shipmentService';
import Contact from '../domain/shipment/Contact';
import contactService from './contactService';

async function createOrder(requestBody: any): Promise<number> {
  const shipmentId = requestBody.shippingId;
  const shipment: Shipment = await shipmentService.getShipmentById(shipmentId);
  const sender: Contact = await contactService.getContactById('77fc3f30-03ff-4cac-a47f-f5323c505af4');
  const receiver: Contact = await contactService.getContactById('c4bfeb69-de6a-42b6-b03f-f2b58e9ae2db');

  const response = await minutos99Gateway.createOrder(
    requestBody.deliveryType,
    requestBody.packageSize,
    requestBody.cahsOnDelivery,
    requestBody.amountCash,
    requestBody.SecurePackage,
    requestBody.amountSecure,
    sender,
    receiver
  );
  await shipmentService.updateShipment(response, shipmentId)
  return response;
}

async function statusOrder(counter: string) {
  const counterNum = counter;
  const response = await minutos99Gateway.statusOrder(counterNum);
  return response;
}

export default {
  createOrder,
  statusOrder
};
