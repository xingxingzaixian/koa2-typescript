import type { Context, Next } from 'koa';
import logger from '../utils/logger';

const logMiddleWare = () => {
  return async (ctx: Context, next: Next) => {
    const start = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
  };
};

export default logMiddleWare;
