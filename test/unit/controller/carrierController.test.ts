import { BaseContext } from 'koa';
import { OK, NO_CONTENT } from 'http-status-codes';
import carrierController from '../../../src/controller/carrierController';
import carrierRepository from '../../../src/repository/carrierRepository';
import ShippingCarrier from '../../../src/domain/shipment/ShippingCarrier';

describe('request shipping carriers', () => {
  describe('if there are carriers', () => {
    test('should return OK', async () => {
      const ctx: BaseContext = {} as BaseContext;

      const carrier: ShippingCarrier = new ShippingCarrier('CarrierName', '123');

      carrierRepository.getAll = jest.fn(async () => [carrier]);

      ctx.request = {
        body: {},
      };

      await carrierController.carriers(ctx);

      expect(ctx.status).toBe(OK);
      expect(ctx.body).toStrictEqual([carrier]);
    });
  });
  describe('if there are not carriers', () => {
    test('should return NO_CONTENT', async () => {
      const ctx: BaseContext = {} as BaseContext;

      carrierRepository.getAll = jest.fn(async () => undefined);

      ctx.request = {
        body: {},
      };

      await carrierController.carriers(ctx);

      expect(ctx.status).toBe(NO_CONTENT);
      expect(ctx.body).toStrictEqual([{}]);
    });
  });
});
