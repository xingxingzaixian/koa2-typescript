import { Context } from 'koa';
import response from '../../utils/response';

class UserController {
  async getUser(ctx: Context) {
    const { user } = ctx.state;
    if (user) {
      response.success(ctx, ctx.state.user, '获取用户信息成功');
    } else {
      response.error(ctx, '用户未登录');
    }
  }
}

export default new UserController();
