import KoaRouter from 'koa-router';
import UserController from './view';
import authMiddleWare from '../../middlewares/authMiddleWare';

const router = new KoaRouter();

router.get('/getUser', authMiddleWare, UserController.getUser);

export default router;
