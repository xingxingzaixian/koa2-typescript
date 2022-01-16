import type { Rules } from 'async-validator';

export const loginRules: Rules = {
  username: {
    type: 'string',
    min: 8,
    required: true,
    message: '用户名或密码错误',
  },
  password: {
    type: 'string',
    min: 8,
    required: true,
    message: '用户名或密码错误',
  },
};

export const registRules: Rules = {
  username: {
    type: 'string',
    min: 8,
    required: true,
  },
  password: {
    type: 'string',
    min: 8,
    required: true,
  },
  confirm: {
    type: 'string',
    min: 8,
    required: true,
    validator: (_, value, callback, values) => {
      if (value !== values.password) {
        callback(new Error('两次密码不一致'));
      }
      callback();
    },
  },
  email: {
    type: 'string',
    required: true,
  },
};
