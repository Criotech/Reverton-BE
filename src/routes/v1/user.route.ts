import express from 'express';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';
import CheckAuth from '../../middlewares/checkAuth.middleware';
import {
  createUser, verifyEmail, login, updateUserProfile
} from '../../controllers/user.controller';

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), createUser);

router
  .route('/security/verify_emai')
  .post(validate(userValidation.verifyEmail), verifyEmail);

router
  .route('/login')
  .post(validate(userValidation.login), login);

router
  .route('/profile')
  .patch(validate(userValidation.updateUserProfile), CheckAuth, updateUserProfile);

export default router;
