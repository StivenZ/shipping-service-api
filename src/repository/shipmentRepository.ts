import { parse } from 'dotenv/types';
import { EntityManager, getManager } from 'typeorm';
import Shipment from '../domain/shipment/Shipment';

async function getById(shipmentId: string): Promise<Shipment> {
  const shipment: Shipment = await getManager().getRepository(Shipment).findOne({ id: shipmentId });

  return shipment;
}

async function getAll(): Promise<Shipment[]> {
  const shipments: Shipment[] = await getManager().getRepository(Shipment).find();

  return shipments;
}

async function upsert(counter: number, body: any, transactionalEntityManager?: EntityManager): Promise<void> {
  const shipmentId = body.shipmentId
  const entityManager: EntityManager = transactionalEntityManager || getManager();
  const counterString = counter.toString();
  await entityManager.getRepository(Shipment)
                     .createQueryBuilder()
                     .update()
                     .set({trackingNumber: counterString})
                     .where({id: shipmentId})
                     .execute();
};

export default {
  getById,
  getAll,
  upsert
};
