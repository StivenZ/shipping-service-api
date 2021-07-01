import { BaseContext } from 'koa';
import { OK } from 'http-status-codes';
import carrierService from '../service/carrierService';
import ShippingCarrier from '../domain/shipment/ShippingCarrier';

async function carriers(ctx: BaseContext) {
  const response: ShippingCarrier[] = await carrierService.getAllCarriers();

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
  carriers,
};
