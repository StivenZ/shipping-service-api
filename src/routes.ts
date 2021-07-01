import Router from 'koa-router';
// import { permit } from './middleware/authorizationMiddleware';
// import { RoleEnum } from './utils/enums';
// import hmacMiddleware from './middleware/hmacMiddleware';
import controller = require('./controller/index');

const routes = new Router();

routes.get('/health/ping', controller.health.ping);
routes.get('/carriers', controller.carrier.carriers);
// routes.post('/shipping/rates', controller...);
routes.get('/shipping/shipment', controller.shipments.getAllShipments);
routes.get('/shipping/contact', controller.shipments.getAllContacts);
routes.post('/shipping/create', controller.shipments.createOrder);
routes.get('/shipping/status/:counter', controller.shipments.shipmentStatus);

// Back-office
// routes.post('/back-office', permit(RoleEnum.ADMIN_USER), controller.invoice.createInvoice);

export default routes;
