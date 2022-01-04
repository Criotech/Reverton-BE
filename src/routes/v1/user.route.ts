import express from 'express';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';
import { createUser, verifyEmail, login } from '../../controllers/user.controller';

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

export default router;
