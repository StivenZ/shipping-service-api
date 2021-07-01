import Contact from '../../../domain/shipment/Contact';

export type TCreateOrder = {
    apikey: string,
    deliveryType: string,
    packageSize: string,
    notes: string,
    cahsOnDelivery: boolean,
    amountCash: number,
    SecurePackage: boolean,
    amountSecure: number,
    receivedId: string,
    sender: Contact,
    receiver: Contact
  }
