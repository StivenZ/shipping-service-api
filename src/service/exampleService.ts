import ServiceError from '../utils/ServiceError';
import logger from '../logger';
import exampleRepository from '../repository/exampleRepository';
import Order from '../domain/order/Order';

async function updateOrder(id: string) {
  // validations:
  if (typeof id !== 'string') {
    throw new ServiceError('Order id must be string');
  }

  const order: Order = new Order();

  order.id = id;

  // Upsert
  await exampleRepository.upsert(order);
}

export default {
  updateOrder
};
