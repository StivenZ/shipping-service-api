/* eslint-disable import/prefer-default-export */
import { BaseContext } from 'koa';
import { FORBIDDEN } from 'http-status-codes';

export function permit(...permittedRoles: Array<string>) {
  return async (ctx: BaseContext, next: Function) => {
    let roles: Array<string>;
    try {
      roles = JSON.parse(ctx.headers.roles);
    } catch (e) {
      ctx.body = { message: 'Access Denied. You do not have permission to access this resource' };
      ctx.status = FORBIDDEN;
      return;
    }
    if (!permittedRoles.some((role) => roles?.includes(role))) {
      ctx.body = { message: 'Access Denied. You do not have permission to access this resource' };
      ctx.status = FORBIDDEN;
      return;
    }
    await next();
  };
}
