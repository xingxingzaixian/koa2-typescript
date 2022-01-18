import type { Context, Next } from 'koa';
import bcryptjs from 'bcryptjs';

/**
 * @description 密码加密处理请求中间件
 * @param ctx
 * @param next
 */
const encryptPassword = async (ctx: Context, next: Next) => {
  const { password, confirm } = ctx.request.body;
  const salt = bcryptjs.genSaltSync(10);
  if (password) {
    ctx.request.body.password = bcryptjs.hashSync(password, salt);
  }

  if (confirm) {
    ctx.request.body.confirm = bcryptjs.hashSync(confirm, salt);
  }

  await next();
};

export default encryptPassword;
