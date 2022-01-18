import KoaRouter from 'koa-router';
import IndexController from './view';
import encryptPassword from '../../middlewares/passwordMiddleWare';
import authMiddleWare from '../../middlewares/authMiddleWare';

const router = new KoaRouter();

router.post('/login', IndexController.login);
router.post('/register', encryptPassword, IndexController.register);
router.post('/upload', authMiddleWare, IndexController.upload);

export default router;
