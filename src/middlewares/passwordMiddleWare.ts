import type { Context, Next } from 'koa';
import bcryptjs from 'bcryptjs';

/**
 * @description 密码加密处理请求中间件
 * @param ctx
 * @param next
 */
const encryptPassword = async (ctx: Context, next: Next) => {
  const { password, confirm } = ctx.validatedBody;
  const salt = bcryptjs.genSaltSync(10);
  if (password) {
    ctx.validatedBody.password = bcryptjs.hashSync(password, salt);
  }

  if (confirm) {
    ctx.validatedBody.confirm = bcryptjs.hashSync(confirm, salt);
  }

  await next();
};

export default encryptPassword;
