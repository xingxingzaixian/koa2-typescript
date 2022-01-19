import type { Context, Next } from 'koa';
import { verifyToken } from '../utils/auth';

/**
 * @description 登录认证中间件
 * @param ctx
 * @param next
 */
const authMiddleWare = async (ctx: Context, next: Next) => {
  const { authorization } = ctx.request.header;
  if (!authorization) {
    ctx.throw(401, '未登录');
  }

  const token =
    authorization.indexOf(' ') === -1
      ? authorization
      : authorization.split(' ')[1];
  const { data, error } = verifyToken(token);
  if (!error) {
    ctx.state.user = data;
  } else {
    switch (error.name) {
      case 'TokenExpiredError':
        ctx.throw(401, '登录已过期');
        break;
      default:
        ctx.throw(400, 'Token错误');
        break;
    }
  }
  await next();
};

export default authMiddleWare;
