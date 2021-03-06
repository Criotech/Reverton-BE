import express from 'express';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';
import CheckAuth from '../../middlewares/checkAuth.middleware';
import {
  createUser, verifyEmail, login, updateUserProfile, updateProfilePic, fetchAUser, getAuthUser, forgotPassword, resetPassword, updatePassword
} from '../../controllers/user.controller';
import Upload from '../../middlewares/fileUpload.middleware';

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), createUser);

router
  .route('/user/:userId')
  .get(validate(userValidation.fetchAUser), CheckAuth, fetchAUser);

router
  .route('/auth')
  .get(CheckAuth, getAuthUser);

router
  .route('/security/verify_emai')
  .post(validate(userValidation.verifyEmail), verifyEmail);

router
  .route('/login')
  .post(validate(userValidation.login), login);

router
  .route('/profile')
  .patch(validate(userValidation.updateUserProfile), CheckAuth, updateUserProfile);

router
  .route('/dp')
  .patch(Upload.single('image'), CheckAuth, updateProfilePic);

router
  .route('/forgotpassword')
  .post(validate(userValidation.forgotPassword), forgotPassword);

router
  .route('/resetpassword')
  .post(validate(userValidation.resetPassword), resetPassword);

router
  .route('/password')
  .patch(validate(userValidation.updatePassword), CheckAuth, updatePassword);

export default router;
