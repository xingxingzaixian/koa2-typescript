import type { Context } from 'koa';

/**
 * @description 成功响应
 * @param ctx
 * @param data
 * @param message
 */
const success = (
  ctx: Context,
  data: any,
  message: string | undefined = undefined,
) => {
  ctx.body = {
    code: 0,
    data,
    message,
  };
};

/**
 * @description 失败响应
 * @param ctx
 * @param message
 */
const error = (ctx: Context, message: string) => {
  ctx.body = {
    code: -1,
    message,
  };
};

export default { success, error };
