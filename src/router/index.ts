import path from 'path';
import KoaRouter from 'koa-router';
import { walkDir } from '../utils/utils';

const router = new KoaRouter();

walkDir(path.join(process.cwd(), 'src/controller'), (file) => {
  if (file.endsWith('router.ts')) {
    import(file).then((controller) => {
      if (controller) {
        router.use(controller.default.routes());
        router.use(controller.default.allowedMethods());
      }
    });
  }
});

export default router;
