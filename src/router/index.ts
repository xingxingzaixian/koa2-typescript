import path from 'path';
import { SwaggerRouter } from 'koa-swagger-decorator';

const router = new SwaggerRouter();

router.swagger({
  title: 'koa2 基础 API',
  description: 'API',
  version: '1.0.0',
});

// 这里会动态的检索 controller 目录下的所有 .js、.ts 文件，并获取默认导出类，生成路由和API
// 因此就不需要我们再收到注册路由和自己实现动态加载路由的功能了，具体的路由格式请参考 controller 目录下的实现
router.mapDir(path.resolve(__dirname, '../controller'), {
  ignore: ['schema.ts'],
});

// 重定向/路由到/swagger-html路由，这是默认的API文档路由地址
router.redirect('/', '/swagger-html');

export default router;
