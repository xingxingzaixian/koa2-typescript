import jwt from 'jsonwebtoken';
import config from '../config';

/**
 *
 * @param payload 用户信息
 * @returns
 */
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, config.secret, { expiresIn: '1d' });
};

/**
 *
 * @param token
 * @returns
 */
export const verifyToken = (token: string): Record<string, any> => {
  try {
    return { data: jwt.verify(token, config.secret), error: null };
  } catch (error) {
    return { data: {}, error };
  }
};
