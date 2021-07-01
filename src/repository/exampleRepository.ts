import { EntityManager, getManager } from 'typeorm';
import Order from '../domain/order/Order';

async function upsert(order: Order, transactionalEntityManager?: EntityManager): Promise<void> {
  const entityManager: EntityManager = transactionalEntityManager || getManager();

  await entityManager.getRepository(Order).insert(order);
}

export default {
  upsert,
};
