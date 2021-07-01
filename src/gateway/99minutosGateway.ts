import { AxiosError } from 'axios';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import { Console } from 'console';
import Package from '../domain/shipment/Package';
import Contact from '../domain/shipment/Contact';
import minutos99Client from './99minutos/99minutosClient';
import Minutos99ApiFaultError from './99minutos/99minutosApiFaultError';
import logger from '../logger';
import config from '../config';

export const API_SERVICES = {
  create: '/autorization/order',
  cancel: '/cancel/order',
  tracking: '/tracking/order?tracking=',
  rates: '/shipping/rates',
  guides: '/guide/order'
};

// eslint-disable-next-line
async function createOrder(deliveryType: string, packageSize: string, cahsOnDelivery: boolean, amountCash: string, SecurePackage: boolean, amountSecure: number, sender: Contact, receiver: Contact) {
  const requestBody: Object = {
    // eslint-disable-next-line no-underscore-dangle
    apikey: config._99minutos.apiKey,
    deliveryType,
    packageSize,
    notes: '',
    cahsOnDelivery,
    amountCash,
    SecurePackage,
    amountSecure,
    receivedId: '',
    origin: {
      sender: sender.name,
      nameSender: sender.name,
      lastNameSender: sender.name,
      emailSender: sender.email,
      phoneSender: sender.phone,
      addressOrigin: `${sender.street1} ${sender.street2}`,
      numberOrigin: sender.indications,
      codePostalOrigin: sender.postalCode,
      country: sender.country
    },
    destination: {
      receiver: receiver.name,
      nameReceiver: receiver.name,
      lastNameReceiver: receiver.name,
      emailReceiver: receiver.email,
      phoneReceiver: receiver.phone,
      addressDestination: `${receiver.street1} ${receiver.street2}`,
      numberDestination: receiver.indications,
      codePostalDestination: receiver.postalCode,
      country: sender.country
    }
  };

  try {
    const response = await minutos99Client.postRequest(requestBody, API_SERVICES.create);

    if (typeof response.message === 'string') {
      throw new Minutos99ApiFaultError('One or more fields are missing', BAD_REQUEST);
    }
  
    return response.message[0].reason.counter;
  } catch (e) {
    if (e.message !== 'One or more fields are missing') {
      logger.error(`Out of range: ${e.name} - ${e.message}: ${e.stack}`);
      throw new Minutos99ApiFaultError('Out of range', BAD_REQUEST);
    }
    logger.error(`Internal server error: 99minutos API: ${e.name} - ${e.message}: ${e.stack}`);
    throw e;
  }
}

async function pricingConsult(box: Package, sender: Contact, receiver: Contact) {
  const body = {
    weight: box.weight,
    width: box.width,
    depth: box.length,
    height: box.height,
    origin: {
      pickup: `${sender.street1} ${sender.street2}`,
      country: sender.country
    },
    destination: {
      destination: `${receiver.street1} ${receiver.street2}`,
      country: receiver.country
    }
  };

  try {
    const response = await minutos99Client.postRequest(body, API_SERVICES.rates);

    if (response.message === 'Package size not allowed') {
      throw new Minutos99ApiFaultError('Some parameters were not passed correctly', BAD_REQUEST);
    } else if (response.message.title || response.message === ('Country not allowed' || 'Empty origin or destination')) {
      throw new Minutos99ApiFaultError('Out of range', BAD_REQUEST);
    }

    return response;
  } catch (e) {
    if ((e as Minutos99ApiFaultError).faultCode === BAD_REQUEST) {
      throw e;
    } else {
      logger.error(`Internal server error: 99minutos API: ${e.name} - ${e.message}: ${e.stack}`);
      throw new Minutos99ApiFaultError('Internal server error', BAD_REQUEST);
    }
  }
}

async function createLabel(counter: number[], base64: boolean, size: string) {
  const RequestBody: Object = {
    counter,
    base64,
    size
  };

  try {
    const response = await minutos99Client.postRequest(RequestBody, API_SERVICES.guides);

    if (response.pdf === '') {
      throw new Minutos99ApiFaultError('No tracking number', BAD_REQUEST);
    }

    return response;
  } catch (e) {
    if (e.message === 'No tracking number') {
      throw e;
    } else {
      logger.error(`Internal server error: 99minutos API: ${e.name} - ${e.message}: ${e.stack}`);
      throw new Minutos99ApiFaultError('Internal server error', BAD_REQUEST);
    }
  }
}

async function statusOrder(trackingNumber: string) {
  const url: string = `${API_SERVICES.tracking}${trackingNumber}`;
  try {
    const response = await minutos99Client.getRequest(url);

    if (response === '') {
      throw new Error('No such order');
    }

    return response;
  } catch (e) {
    if (e.message === 'No such order') {
      throw new Minutos99ApiFaultError('No such order', BAD_REQUEST);
    } else {
      logger.error(`Internal server error: 99minutos API: ${e.name} - ${e.message}: ${e.stack}`);
      throw e;
    }
  }
}

interface TOrderResponse { message: string, counter: number }

async function cancelOrder(counters: number[]) {
  const requestBody: Object = {
    counters
  };

  try {
    const response = await minutos99Client.postRequest(requestBody, API_SERVICES.cancel);

    const cancelledOrders: TOrderResponse[] = [];
    const notFound: TOrderResponse[] = [];
    const alreadyCancelled: TOrderResponse[] = [];

    const mapping: boolean = response.message.map((el: TOrderResponse) => {
      if (el.message === 'Cancelada') {
        cancelledOrders.push(el);
      } else if (el.message === 'Orden ya cancelada') {
        alreadyCancelled.push(el);
      } else {
        notFound.push(el);
      }
      return true;
    });

    logger.log('info', 'Already cancelled orders:', alreadyCancelled);
    logger.log('info', 'Not found orders:', notFound);

    if (cancelledOrders.length === 0) {
      throw new Error('No active orders were found');
    } else {
      return cancelledOrders;
    }
  } catch (e) {
    if (e.message === 'No active orders were found') {
      throw new Minutos99ApiFaultError('No active orders were found', BAD_REQUEST);
    } else {
      logger.error(`Internal server error: 99minutos API: ${e.name} - ${e.message}: ${e.stack}`);
      throw e;
    }
  }
}

export default {
  createOrder,
  pricingConsult,
  createLabel,
  statusOrder,
  cancelOrder
};
