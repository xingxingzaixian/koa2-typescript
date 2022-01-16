import { Context } from 'koa';
import validate from '../../utils/validate';
import { LoginParam, RegisterParam } from './types';
import { loginRules, registRules } from './rules';
import response from '../../utils/response';
import type { Files, File as FileType } from 'formidable';
import User from '../../entity/User';

class IndexController {
  async index(ctx: Context) {
    response.success(ctx, 'hello world');
  }

  async login(ctx: Context) {
    const { data, error } = await validate<LoginParam>(ctx, loginRules);
    if (error) {
      response.error(ctx, error);
      return;
    }

    response.success(ctx, data);
  }

  async register(ctx: Context) {
    const { data, error } = await validate<RegisterParam>(ctx, registRules);
    if (error) {
      response.error(ctx, error);
      return;
    }

    // 校验用户是否已经存在
    let user: User | undefined = await User.getUserInfo(data.username);
    if (user) {
      response.error(ctx, '用户名已存在');
      return;
    }

    // 注册用户
    user = new User();
    user.username = data.username;
    user.password = data.password;
    user.email = data.email;
    await User.createUser(user);

    response.success(ctx, data, '注册成功');
  }

  async upload(ctx: Context) {
    const files: Files | undefined = ctx.request.files;
    if (files) {
      const data: { url: string; name: string; size: number }[] = [];
      for (const key in files) {
        const file: FileType = files[key] as FileType;
        data.push({
          url: file.path,
          name: file.name!,
          size: file.size,
        });
      }
      response.success(ctx, data, '上传成功');
    } else {
      response.error(ctx, '上传失败');
    }
  }
}

export default new IndexController();
