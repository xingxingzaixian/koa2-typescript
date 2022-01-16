import type { Context } from 'koa';
import Schema, { Value, Rules } from 'async-validator';

/**
 * 请求表单验证
 * @param ctx
 * @param rules
 * @returns
 */
const validate = async <T extends Value>(
  ctx: Context,
  rules: Rules,
): Promise<{ data: T; error: string }> => {
  const validator = new Schema(rules);
  let data: any = null;
  switch (ctx.method) {
    case 'GET':
      data = ctx.query;
      break;
    case 'POST':
      data = ctx.request.body;
      break;
    case 'PUT':
      data = ctx.request.body;
      break;
    case 'DELETE':
      data = ctx.query;
      break;
    default:
      data = ctx.request.body;
  }

  return await validator
    .validate(data)
    .then(() => {
      return {
        data: data as T,
        error: '',
      };
    })
    .catch((err) => {
      return {
        data: {} as T,
        error: err.errors[0].message,
      };
    });
};

export default validate;
