import { BaseContext } from 'koa';
import { OK } from 'http-status-codes';

async function ping(ctx: BaseContext): Promise<void> {
  ctx.status = OK;
  ctx.body = { pong: 'pong' };
}

export default {
  ping
};
