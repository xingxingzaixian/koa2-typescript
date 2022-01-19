import { Context } from 'koa';
import response from '../../utils/response';
import { request, middlewaresAll, summary, tags } from 'koa-swagger-decorator';
import authMiddleWare from '../../middlewares/authMiddleWare';
import User from '../../entity/User';
import logger from '../../utils/logger';

@middlewaresAll([authMiddleWare])
export default class UserController {
  @request('get', '/getuserinfo')
  @summary('获取登录用户信息')
  @tags(['用户管理'])
  static async getUser(ctx: Context) {
    const { user } = ctx.state;
    if (user) {
      response.success(ctx, ctx.state.user, '获取用户信息成功');
    } else {
      response.error(ctx, '用户未登录');
    }
  }

  @request('get', '/getuserlist')
  @summary('获取用户列表')
  @tags(['用户管理'])
  static async getUserList(ctx: Context) {
    try {
      const userList: User[] = await User.getUserList();
      response.success(ctx, userList, '获取用户列表成功');
    } catch (error) {
      logger.error(error);
      response.error(ctx, '获取用户列表失败');
    }
  }
}
