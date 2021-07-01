import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import client99minutos from '../../../src/gateway/99minutos/99minutosClient';
import config from '../../../src/config';
import { API_SERVICES } from '../../../src/gateway/99minutosGateway';

class TestAxiosError<T = any> extends Error {
  response: AxiosResponse<T>;

  isAxiosError: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.isAxiosError = true;
    this.response = { status: statusCode } as AxiosResponse;
  }
}
describe('99minutos postRequest', () => {
  const expectedAxiosRequest: AxiosRequestConfig = {
    url: 'https://sandbox.99minutos.com/api/v1/url',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer API_KEY'
    },
    data: {}
  };

  describe('Successful order creation', () => {
    const expectedCreateResponse = {
      data: {
        message: [
          {
            message: 'Creado',
            reason: {
              counter: 644754353,
              trackingid: '550a5c91-a4cd-42ff-8f4f-8c67663420cb',
              clienid: '550a5c91-a4cd-42ff-8f4f-8c67663420cb',
              created: '2021-06-09T01:49:13.000-05:00',
              zonification: 's/z',
            },
          },
        ],
      },
    };

    beforeAll(() => {
      axios.request = jest.fn().mockResolvedValueOnce(expectedCreateResponse);
    });

    afterAll(() => {
      (axios.request as jest.Mock).mockReset();
    });

    test('created order', async () => {
      expect(await client99minutos.postRequest({}, '/url')).toStrictEqual(expectedCreateResponse.data);
      expect(axios.request).toHaveBeenCalledWith(expectedAxiosRequest);
    });
  });

  describe('Failed order creation', () => {
    const expectedError500 = new TestAxiosError('Internal server error', 500);

    beforeAll(() => {
      axios.request = jest.fn().mockResolvedValueOnce(expectedError500);
    });

    afterAll(() => {
      (axios.request as jest.Mock).mockReset();
    });
    test('error when no apikey was found', async () => {
      expect(client99minutos.postRequest({}, '/url')).rejects.toThrow(expectedError500.message);
    });
  });
});

describe('99minutos getRequest', () => {
  const expectedAxiosRequest: AxiosRequestConfig = {
    url: 'https://sandbox.99minutos.com/api/v1/url',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer API_KEY'
    }
  };

  describe('Successful status request', () => {
    const expectedStatusResponse = {
      data:
        [
          {
            tracking_number: 'a320417f-7fdf-4fd5-8793-6ec1250cea20',
            counter: '500159762',
            barcode: '',
            packageSize: 'm',
            deliveryType: 'SameDay',
            receivedorderid: 'a320417f-7fdf-4fd5-8793-6ec1250cea20',
            status: '1',
            notas: '#id | Cobro: Si, cobrar: 30 | Recibe: Pedro Salas | Recolecta con: Powirnv',
            COD: '30.00',
            has_paid: 'False',
            Company: 'Valienta.co',
            pickup: {
              sender: 'Powirnv',
              sender_phone: '0000000000',
              pickup_Address: 'merida 238 cmd , 06700,,06700,mex'
            },
            delivery: {
              destination_Address: 'merida 238 , roma norte 06700,,06700,MEX',
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
                created: '2021-06-11 01:26:21',
                comment: '',
                comment_client: ''
              }
            ]
          }
        ]
    };

    beforeAll(() => {
      axios.request = jest.fn().mockResolvedValueOnce(expectedStatusResponse);
    });

    afterAll(() => {
      (axios.request as jest.Mock).mockReset();
    });

    test('order status', async () => {
      expect(await client99minutos.getRequest('/url')).toStrictEqual(expectedStatusResponse.data);
      expect(axios.request).toHaveBeenCalledWith(expectedAxiosRequest);
    });
  });
});
