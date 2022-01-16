import Koa from 'koa';
import router from './router';
import KoaBody from 'koa-body';
import KoaCors from 'koa2-cors';
import { Server } from 'http';
import logMiddleWare from './middlewares/logMiddleWare';

// 创建服务对象
const app = new Koa();

app.use(logMiddleWare());
app.use(
  KoaBody({
    // 启用表单解析，可以支持文件上传
    multipart: true,
    formidable: {
      // 文件上传路径
      uploadDir: './uploads',

      // 保持文件的扩展名
      keepExtensions: true,

      // 文件上传大小限制，默认5M
      maxFieldsSize: 5 * 1024 * 1024,

      // 保持文件的扩展名
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(name, file);
      },
    },
  }),
);

app.use(
  KoaCors({
    origin: '*', // 设置允许的域名，*表示允许任何域名使用
    allowMethods: ['*'], // 设置允许的请求方法，*表示允许任何请求方法
    allowHeaders: ['*'], // 设置允许的请求头，*表示允许任何请求头
    credentials: true, //是否允许发送Cookie
  }),
);

// 引入路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
const runServer = (port: number): Server => {
  console.log('Server running on port ' + port);
  return app.listen(port);
};

export default runServer;
