import KoaRouter from 'koa-router';
import IndexController from './view';

const router = new KoaRouter();

router.get('/', IndexController.index);
router.post('/login', IndexController.login);
router.post('/register', IndexController.register);
router.post('/upload', IndexController.upload);

export default router;
