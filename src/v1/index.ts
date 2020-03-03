import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import config from '../config/config';
import AuthMiddleware from '../middleware/auth';

import * as AuthController from './controllers/auth';
import * as UserController from './controllers/user';
import * as BookController from './controllers/book';
import apiSpec from './openapi.json';

const router = Router();

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/status', (req, res) => res.json({ status: 'UP' }));

router.post('/auth/login', AuthController.login);
router.post('/auth/signup', AuthController.signup);

router.post('/user/me', [AuthMiddleware], UserController.me);
router.get('/user/all', [AuthMiddleware], UserController.all);

router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// Dev routes
if (config.isDevelopment) {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
