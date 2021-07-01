import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { BAD_REQUEST } from 'http-status-codes';
import { send } from 'process';
import minutos99Gateway from '../../../src/gateway/99minutosGateway';
import Contact from '../../../src/domain/shipment/Contact';
import Package from '../../../src/domain/shipment/Package';
import config from '../../../src/config';
import minutos99Client from '../../../src/gateway/99minutos/99minutosClient';
import Minutos99ApiFaultError from '../../../src/gateway/99minutos/99minutosApiFaultError';

class TestAxiosError<T = any> extends Error {
    response: AxiosResponse<T>;

    isAxiosError: boolean;

    constructor(message: string, statusCode: number) {
      super(message);
      this.isAxiosError = true;
      this.response = { status: statusCode } as AxiosResponse;
    }
}

describe('createOrder Gateway', () => {
  const deliveryTypeMock: string = 'sameDay';
  const packageSizeMock: string = 'm';
  const cahsOnDeliveryMock: boolean = true;
  const amountCashMock: string = '30';
  const SecurePackageMock: boolean = true;
  const amountSecureMock: number = 0;
  const senderMock: Contact = new Contact();
  const receiverMock: Contact = new Contact();

  senderMock.name = 'mockNameString';
  senderMock.email = 'mockEmailString';
  senderMock.phone = 'mockPhoneString';
  senderMock.street1 = 'mockStreet1';
  senderMock.street2 = 'mockStreet2';
  senderMock.indications = 'mockIndications';
  senderMock.postalCode = 'mockPostalCode';
  senderMock.country = 'mockCountry';
  receiverMock.name = 'mockNameString';
  receiverMock.email = 'mockEmailString';
  receiverMock.phone = 'mockPhoneString';
  receiverMock.street1 = 'mockStreet1';
  receiverMock.street2 = 'mockStreet2';
  receiverMock.indications = 'mockIndications';
  receiverMock.postalCode = 'mockPostalCode';
  receiverMock.country = 'mockCountry';

  const requestBodyMock = {
    // eslint-disable-next-line no-underscore-dangle
    apikey: config._99minutos.apiKey,
    deliveryType: deliveryTypeMock,
    packageSize: packageSizeMock,
    notes: '',
    cahsOnDelivery: cahsOnDeliveryMock,
    amountCash: amountCashMock,
    SecurePackage: SecurePackageMock,
    amountSecure: amountSecureMock,
    receivedId: '',
    origin: {
      sender: senderMock.name,
      nameSender: senderMock.name,
      lastNameSender: senderMock.name,
      emailSender: senderMock.email,
      phoneSender: senderMock.phone,
      addressOrigin: `${senderMock.street1} ${senderMock.street2}`,
      numberOrigin: senderMock.indications,
      codePostalOrigin: senderMock.postalCode,
      country: senderMock.country,
    },
    destination: {
      receiver: receiverMock.name,
      nameReceiver: receiverMock.name,
      lastNameReceiver: receiverMock.name,
      emailReceiver: receiverMock.email,
      phoneReceiver: receiverMock.phone,
      addressDestination: `${receiverMock.street1} ${receiverMock.street2}`,
      numberDestination: receiverMock.indications,
      codePostalDestination: receiverMock.postalCode,
      country: senderMock.country,
    },
  };

  const clientMock = {
    message: {
      rule: 'Creada',
      type: '',
      order: {
        counter: 2873856,
        trackingid: '55595bae-2b6e-455e-92ff-961996da4379',
        clienid: '#12',
      },
    }
  };

  describe('successful create order', () => {
    const objt: Object = {
      name: '',
      house: ''
    }
    beforeAll(() => {
      minutos99Client.postRequest = jest.fn().mockResolvedValueOnce(objt);
    });

    afterAll(() => {
      (minutos99Client.postRequest as jest.Mock).mockReset();
    });

    test('should return counter number', async () => {
      expect(
        await minutos99Gateway.createOrder(
          deliveryTypeMock,
          packageSizeMock,
          cahsOnDeliveryMock,
          amountCashMock,
          SecurePackageMock,
          amountSecureMock,
          senderMock,
          receiverMock
        )
      ).toStrictEqual(2873856);
      expect(minutos99Client.postRequest).toHaveBeenCalledWith(
        requestBodyMock,
        '/autorization/order'
      );
    });
  });

  describe('failed create order', () => {
    const senderMock2: Contact = new Contact();

    senderMock2.name = 'fabio';
    senderMock2.email = 'mail';
    senderMock2.phone = '1234';
    senderMock2.street1 = 'stree1';
    senderMock2.street2 = 'street2';
    senderMock2.indications = '';
    senderMock2.postalCode = 'inter';
    senderMock2.country = 'COL';

    const receiverMock2: Contact = new Contact();

    receiverMock2.name = 'fabio';
    receiverMock2.email = 'mail';
    receiverMock2.phone = '1234';
    receiverMock2.street1 = 'stree1';
    receiverMock2.street2 = 'street2';
    receiverMock2.indications = '';
    receiverMock2.postalCode = 'inter';
    receiverMock2.country = 'COL';
    const requestBodyMock2 = {
      // eslint-disable-next-line no-underscore-dangle
      apikey: '',
      deliveryType: 'deliveryType',
      packageSize: '1234',
      notes: '',
      cahsOnDelivery: true,
      amountCash: '1234',
      SecurePackage: true,
      amountSecure: 1234,
      receivedId: '',
      origin: {
        sender: senderMock2.name,
        nameSender: senderMock2.name,
        lastNameSender: senderMock2.name,
        emailSender: senderMock2.email,
        phoneSender: senderMock2.phone,
        addressOrigin: `${senderMock2.street1} ${senderMock2.street2}`,
        numberOrigin: senderMock2.indications,
        codePostalOrigin: senderMock2.postalCode,
        country: senderMock2.country,
      },
      destination: {
        receiver: receiverMock2.name,
        nameReceiver: receiverMock2.name,
        lastNameReceiver: receiverMock2.name,
        emailReceiver: receiverMock2.email,
        phoneReceiver: receiverMock2.phone,
        addressDestination: `${receiverMock2.street1} ${receiverMock2.street2}`,
        numberDestination: receiverMock2.indications,
        codePostalDestination: receiverMock2.postalCode,
        country: senderMock2.country,
      }
    };

    describe('missing fields', () => {
      const response = {
        message: 'deliveryType no encontrado'
      };

      beforeAll(() => {
        minutos99Client.postRequest = jest.fn().mockResolvedValueOnce(response);
      });

      afterAll(() => {
        (minutos99Client.postRequest as jest.Mock).mockReset();
      });

      test('should return one or more fields are missing', async () => {
        const expectedError = new Minutos99ApiFaultError('One or more fields are missing', BAD_REQUEST);

        await expect(minutos99Gateway.createOrder(
          '', '1234', true, '1234', true, 1234, senderMock2, receiverMock2
        )).rejects.toThrow(expectedError);
      });
    });

    describe('out of range', () => {
      senderMock2.email = '';
      const response = {
        message: [
          {
            message: 'Fuera de cobertura',
            reason: ''
          }
        ]
      };

      beforeAll(() => {
        minutos99Client.postRequest = jest.fn().mockResolvedValueOnce(response);
      });

      afterAll(() => {
        (minutos99Client.postRequest as jest.Mock).mockReset();
        senderMock2.email = 'mail';
      });

      test('should return out of range', async () => {
        const expectedError = new Minutos99ApiFaultError('Out of range', BAD_REQUEST);

        await expect(minutos99Gateway.createOrder(
          'DeliveryType', '1234', true, '1234', true, 1234, senderMock2, receiverMock2
        )).rejects.toThrow(expectedError);
      });
    });
  });
});

describe('cancelOrder Gateway', () => {
  describe('successful cancelled order', () => {
    const orders = [571843535, 229988866, 831262765];
    const request = {
      counters: [
        571843535,
        229988866,
        831262765
      ]
    };

    const response = {
      message: [
        {
          counter: 571843535,
          message: 'Cancelada'
        },
        {
          counter: 229988866,
          message: 'Cancelada'
        },
        {
          counter: 831262765,
          message: 'Cancelada'
        }
      ]
    };

    const expectedCancelResponse = [
      {
        counter: 571843535,
        message: 'Cancelada'
      },
      {
        counter: 229988866,
        message: 'Cancelada'
      },
      {
        counter: 831262765,
        message: 'Cancelada'
      }
    ];

    beforeAll(() => {
      minutos99Client.postRequest = jest.fn().mockResolvedValueOnce(response);
    });

    afterAll(() => {
      (minutos99Client.postRequest as jest.Mock).mockReset();
    });
    test('should return cancelled orders list', async () => {
      expect(await minutos99Gateway.cancelOrder(orders)).toStrictEqual(expectedCancelResponse);
      expect(minutos99Client.postRequest).toHaveBeenCalledWith(request, '/cancel/order');
    });
  });

  describe('failed order cancel', () => {
    describe('when no orders are found', () => {
      const expectedError = new Minutos99ApiFaultError('No active orders were found', BAD_REQUEST);
      const orders = [23412];
      const requestBody = {
        counters: [
          23412
        ]
      };
      const response = {
        message: [
          {
            counter: 23412,
            message: 'No encontrada'
          }
        ]
      };

      beforeAll(() => {
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(response);
      });

      afterAll(() => {
        (minutos99Client.postRequest as jest.Mock).mockReset();
      });
      test('should return no active orders found', async () => {
        await expect(minutos99Gateway.cancelOrder(orders)).rejects.toThrow(expectedError);
        expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestBody, '/cancel/order');
      });
    });

    describe('mixed not found, cancelled and already cancelled', () => {
      const requestMixedBody = {
        counters: [
          251839,
          251839317,
          123,
          617388204
        ]
      };

      const responseMixedBody = {
        message: [
          {
            counter: 251839,
            message: 'No encontrada'
          },
          {
            counter: 251839317,
            message: 'Orden ya cancelada'
          },
          {
            counter: 123,
            message: 'No encontrada'
          },
          {
            counter: 617388204,
            message: 'Cancelada'
          }
        ]
      };

      const ordersMixed = [251839, 251839317, 123, 617388204];
      const response = [
        {
          counter: 617388204,
          message: 'Cancelada'
        }
      ];

      beforeAll(() => {
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(responseMixedBody);
      });

      afterAll(() => {
        (minutos99Client.postRequest as jest.Mock).mockReset();
      });

      test('should return mixed cancel responses', async () => {
        expect(await minutos99Gateway.cancelOrder(ordersMixed)).toStrictEqual(response);
        expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestMixedBody, '/cancel/order');
      });
    });
  });
});

describe('statusOrder Gateway', () => {
  describe('when the order is active', () => {
    const trackingNumber = '867129699';
    const responseBody = [
      {
        tracking_number: 'c71d528e-6aea-47df-94ff-509b1a44c25b',
        counter: '867129699',
        barcode: '',
        packageSize: 'm',
        deliveryType: 'NextDay',
        receivedorderid: 'c71d528e-6aea-47df-94ff-509b1a44c25b',
        status: '1',
        notas: '#id | Cobro: Si, cobrar: 30 | Recibe: Pedro Salas | Recolecta con: otros',
        COD: '0.00',
        has_paid: 'False',
        Company: 'Valienta.co',
        pickup: {
          sender: 'otros',
          sender_phone: '0000000000',
          pickup_Address: 'merida cmd , 06700,,,col'
        },
        delivery: {
          destination_Address: 'merida 238 , rorte 06700,,06700,COL',
          client: 'Pedro Salas',
          client_phone: '5518755128'
        },
        driver: {
          driver_user: 'None',
          driver_name: 'None',
          driver_vehicle: 'None',
          driver_phone: 'None'
        },
        events: [
          {
            code: '1',
            created: '2021-06-15 14:11:40',
            comment: '',
            comment_client: ''
          }
        ]
      }
    ];

    describe('return status code 1', () => {
      beforeAll(() => {
        minutos99Client.getRequest = jest.fn().mockReturnValueOnce(responseBody);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
      });

      test('should return correct status order body', async () => {
        expect(await minutos99Gateway.statusOrder(trackingNumber)).toStrictEqual(responseBody);
        expect(minutos99Client.getRequest).toHaveBeenCalledWith(`/tracking/order?tracking=${trackingNumber}`);
      });
    });
  });

  describe('failed status order', () => {
    describe('when order is was cancelled', () => {
      const trackingNumber = '795394945';
      const responseBody = [
        {
          tracking_number: '5ccef9d7-d846-4122-8e71-015a108f1202',
          counter: '795394945',
          barcode: '',
          packageSize: 'm',
          deliveryType: 'NextDay',
          receivedorderid: '5ccef9d7-d846-4122-8e71-015a108f1202',
          status: '7',
          notas: '#id | Cobro: Si, cobrar: 30 | Recibe: Pedro Salas | Recolecta con: otros',
          COD: '0.00',
          has_paid: 'False',
          Company: 'Valienta.co',
          pickup: {
            sender: 'otros',
            sender_phone: '0000000000',
            pickup_Address: 'merida cmd , 06700,,,col'
          },
          delivery: {
            destination_Address: 'merida 238 , rorte 06700,,06700,COL',
            client: 'Pedro Salas',
            client_phone: '5518755128'
          },
          driver: {
            driver_user: 'None',
            driver_name: 'None',
            driver_vehicle: 'None',
            driver_phone: 'None'
          },
          events: [
            {
              code: '7',
              created: '2021-06-15 13:18:21',
              comment: 'Cancelacion por API',
              comment_client: 'Cancelacion por API'
            }
          ]
        }
      ];

      beforeAll(() => {
        minutos99Client.getRequest = jest.fn().mockReturnValueOnce(responseBody);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
      });

      test('should return status code 7', async () => {
        expect(await minutos99Gateway.statusOrder(trackingNumber)).toStrictEqual(responseBody);
        expect(minutos99Client.getRequest).toHaveBeenCalledWith(`/tracking/order?tracking=${trackingNumber}`);
      });
    });

    describe('when erroneous tracking number', () => {
      const responseBody = '';
      const trackingNumber = '123456';

      beforeAll(() => {
        minutos99Client.getRequest = jest.fn().mockReturnValueOnce(responseBody);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
      });

      test('should return no such order', async () => {
        const expectedError = new Minutos99ApiFaultError('No such order', BAD_REQUEST);

        await expect(minutos99Gateway.statusOrder(trackingNumber)).rejects.toThrow(responseBody);
        expect(minutos99Client.getRequest).toHaveBeenCalledWith(`/tracking/order?tracking=${trackingNumber}`);
      });
    });
  });
});

describe('createLabel Gateway', () => {
  let counters = [593744190];
  const base64 = true;
  const size = 'zebra';

  let requestBody = {
    counter: counters,
    base64,
    size
  };
  const response = {
    pdf: 'someLargePdfCode'
  };

  describe('successful label creation', () => {
    beforeAll(() => {
      minutos99Client.postRequest = jest.fn().mockReturnValueOnce(response);
    });

    afterAll(() => {
      (minutos99Client.getRequest as jest.Mock).mockReset();
    });
    test('should return pdf', async () => {
      expect(await minutos99Gateway.createLabel(counters, base64, size)).toStrictEqual(response);
      expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestBody, '/guide/order');
    });
  });

  describe('failed label creation', () => {
    describe('when tracking number is erroneous', () => {
      const expectedError = new Error('Internal server error');

      counters = [1233456];
      requestBody = {
        counter: counters,
        base64,
        size
      };
      beforeAll(() => {
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(expectedError);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
      });
      test('should return internal server error', async () => {
        expect(minutos99Gateway.createLabel(counters, base64, size)).rejects.toThrow(expectedError);
        expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestBody, '/guide/order');
      });
    });

    describe('when tracking number is missing', () => {
      const expectedError = new Minutos99ApiFaultError('No tracking number', BAD_REQUEST);

      counters = [];
      requestBody = {
        counter: counters,
        base64,
        size
      };
      beforeAll(() => {
        response.pdf = '';
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(response);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
        response.pdf = 'someLargePdfCode';
      });
      test('should return no tracking number', async () => {
        await expect(minutos99Gateway.createLabel(counters, base64, size)).rejects.toThrow(expectedError);
        expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestBody, '/guide/order');
      });
    });
  });
});

describe('pricingConsult Gateway', () => {
  const box = new Package();
  const sender = new Contact();
  const receiver = new Contact();

  box.weight = 10;
  box.height = 10;
  box.length = 10;
  box.width = 10;
  sender.street1 = 'mockStreet1';
  sender.street2 = 'mockStreet2';
  sender.country = 'COL';
  receiver.street1 = 'mockStreet1';
  receiver.street2 = 'mockStreet2';
  receiver.country = 'COL';
  const requestBody = {
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

  const response = {
    message: [
      {
        title: 'Envio NextDay (Siguiente dia)',
        deliveryType: {
          code: 2,
          description: 'NextDay'
        },
        packageSize: 'xs',
        cost: '65.00',
        currency: 'MXN'
      },
      {
        title: 'Envio CO2 Free',
        deliveryType: {
          code: 4,
          description: 'CO2 Free'
        },
        packageSize: 'xs',
        cost: '65.00',
        currency: 'MXN'
      },
      {
        title: 'Envio SameDay (Mismo dia antes de las 4pm)',
        deliveryType: {
          code: 1,
          description: 'SameDay'
        },
        packageSize: 'xs',
        cost: '75.00',
        currency: 'MXN'
      },
      {
        title: 'Envio Express (99minutos)',
        deliveryType: {
          code: 3,
          description: '99minutos'
        },
        packageSize: 'xs',
        cost: '99.00',
        currency: 'MXN'
      }
    ]
  };

  describe('successful princing consult', () => {
    beforeAll(() => {
      minutos99Client.postRequest = jest.fn().mockReturnValueOnce(response);
    });

    afterAll(() => {
      (minutos99Client.getRequest as jest.Mock).mockReset();
    });
    test('should return order info', async () => {
      expect(await minutos99Gateway.pricingConsult(box, sender, receiver)).toStrictEqual(response);
      expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestBody, '/shipping/rates');
    });
  });

  describe('failed order info', () => {
    describe('when order is off the limit', () => {
      const responseFail = {
        message: 'Package size not allowed'
      };

      beforeAll(() => {
        box.weight = 100000;
        requestBody.weight = box.weight;
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(responseFail);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
        box.weight = 10;
        requestBody.weight = box.weight;
      });
      test('should return Some parameters were not passed correctly', async () => {
        const expectedError = new Minutos99ApiFaultError('Some parameters were not passed correctly', BAD_REQUEST);

        await expect(minutos99Gateway.pricingConsult(box, sender, receiver)).rejects.toThrow(expectedError);
        expect(minutos99Client.postRequest).toHaveBeenCalledWith(requestBody, '/shipping/rates');
      });
    });

    describe('when postal code is not correctly passed', () => {
      const responseFail2 = {
        message: {
          title: 'Sin cobertura'
        }
      };

      beforeAll(() => {
        sender.postalCode = 'InvalidPostalCode';
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(responseFail2);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
        sender.postalCode = 'mockPostalCode';
      });
      test('should return Out of range', async () => {
        const expectedError = new Minutos99ApiFaultError('Out of range', BAD_REQUEST);

        await expect(minutos99Gateway.pricingConsult(box, sender, receiver)).rejects.toThrow(expectedError);
      });
    });

    describe('when country is not covered', () => {
      const responseFail2 = {
        message: 'Country not allowed'
      };

      beforeAll(() => {
        sender.country = 'InvalidCountry';
        minutos99Client.postRequest = jest.fn().mockReturnValueOnce(responseFail2);
      });

      afterAll(() => {
        (minutos99Client.getRequest as jest.Mock).mockReset();
        sender.country = 'COL';
      });
      test('should return Out of range', async () => {
        const expectedError = new Minutos99ApiFaultError('Out of range', BAD_REQUEST);

        await expect(minutos99Gateway.pricingConsult(box, sender, receiver)).rejects.toThrow(expectedError);
      });
    });
  });
});
