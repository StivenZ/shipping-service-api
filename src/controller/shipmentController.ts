import { BaseContext, Context } from 'koa';
import { OK } from 'http-status-codes';
import carrierService from '../service/carrierService';
import ShippingCarrier from '../domain/shipment/ShippingCarrier';
import createOrderService from '../service/createOrderService';
import shipmentService from '../service/shipmentService';
import contactService from '../service/contactService';

async function createOrder(ctx: Context) {
  const response: number = await createOrderService.createOrder(ctx.request.body);
  
  if (response) {
    ctx.status = 200;
    ctx.body = response;
  } else {
    ctx.status = 204;
    ctx.body = [{}];
  }
}

async function getAllShipments(ctx: Context) {
  const response = await shipmentService.getAllShipments();

  if (response) {
    ctx.status = 200;
    ctx.body = response;
  } else {
    ctx.status = 204;
    ctx.body = [{}];
  }
}

async function getAllContacts(ctx: Context) {
  const response = await contactService.getAllContacts();

  if (response) {
    ctx.status = 200;
    ctx.body = response;
  } else {
    ctx.status = 204;
    ctx.body = [{}];
  }
}
async function shipmentStatus(ctx: Context) {
  const response = await createOrderService.statusOrder(ctx.params.counter)
  if (response) {
    ctx.status = 200;
    ctx.body = response;
  } else {
    ctx.status = 204;
    ctx.body = [{}];
  }
}

// Distrubuyo la info desde el controller hasta el service, para pasarle los parámetros que por ejemplo shipping rates necesita

export default {
  createOrder,
  getAllShipments,
  getAllContacts,
  shipmentStatus
};
