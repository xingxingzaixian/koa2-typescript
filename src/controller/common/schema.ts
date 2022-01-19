import { PropertyOptions } from 'koa-swagger-decorator';

export const loginRules: Record<string, PropertyOptions> = {
  username: {
    type: 'string',
    minLength: 8,
    required: true,
    description: '用户名',
  },
  password: {
    type: 'string',
    minLength: 8,
    required: true,
    description: '密码',
  },
};

export const registRules: Record<string, PropertyOptions | any> = {
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  confirm: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    format: 'email',
    default: 'beixia@163.com',
  },
};
