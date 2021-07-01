import Contact from '../domain/shipment/Contact';
import contactRepository from '../repository/contactRepository';

async function getContactById(contactId: string): Promise<Contact> {
  const contact: Contact = await contactRepository.getById(contactId);

  return contact;
}

async function getAllContacts(): Promise<Contact[]> {
  const contacts: Contact[] = await contactRepository.getAll();

  return contacts;
}

export default {
  getContactById,
  getAllContacts
};
