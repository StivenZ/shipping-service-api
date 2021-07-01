import { getManager } from 'typeorm';
import Contact from '../domain/shipment/Contact';

async function getById(contactId: string): Promise<Contact> {
  const contact = await getManager().getRepository(Contact).findOne({ id: contactId });

  return contact;
}

async function getAll(): Promise<Contact[]> {
  const contacts: Contact[] = await getManager().getRepository(Contact).find();

  return contacts;
}

export default {
  getById,
  getAll
};
