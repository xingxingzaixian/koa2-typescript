import { Context } from 'koa';
import bcryptjs from 'bcryptjs';
import {
  request,
  summary,
  body,
  tags,
  formData,
  responses,
  middlewares,
} from 'koa-swagger-decorator';
import response from '../../utils/response';
import { loginRules, registRules } from './schema';
import User from '../../entity/User';
import { generateToken } from '../../utils/auth';
import type { Files, File as FileType } from 'formidable';
import encryptPassword from '../../middlewares/passwordMiddleWare';

export default class IndexController {
  @request('post', '/login')
  @summary('登录')
  @tags(['基础接口'])
  @body(loginRules)
  @responses({
    200: { description: 'success' },
    500: { description: 'something wrong about server' },
  })
  static async login(ctx: Context) {
    const data = ctx.validatedBody;

    // 校验用户是否存在
    let user: User | undefined = await User.getUserInfo(data.username);
    if (!user) {
      response.error(ctx, '用户不存在');
      return;
    }

    // 校验密码是否正确
    if (!bcryptjs.compareSync(data.password, user.password)) {
      response.error(ctx, '密码错误');
      return;
    }

    const { password, ...rest } = user;
    const token = generateToken(rest);
    response.success(ctx, { token }, '登录成功');
  }

  @request('post', '/register')
  @summary('注册')
  @tags(['基础接口'])
  @middlewares([encryptPassword])
  @body(registRules)
  static async register(ctx: Context) {
    const data = ctx.validatedBody;

    // 确认密码是否一致
    if (data.password !== data.confirm) {
      response.error(ctx, '密码不一致');
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

  @request('post', '/upload')
  @summary('上传文件')
  @tags(['基础接口'])
  @formData({
    file: { type: 'string', required: true, format: 'binary' },
  })
  static async upload(ctx: Context) {
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
