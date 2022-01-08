import express from 'express';
import { walletValidation } from '../../validations';
import validate from '../../middlewares/validate';
import CheckAuth from '../../middlewares/checkAuth.middleware';
import {
  fundWallet, verifyDeposit, walletBalance
} from '../../controllers/wallet.controller';

const router = express.Router();

router
  .route('/deposit')
  .post(validate(walletValidation.fundWallet), CheckAuth, fundWallet);

router
  .route('/deposit/verify/:referenceId')
  .get(validate(walletValidation.veifyDeposit), CheckAuth, verifyDeposit);

router
  .route('/')
  .get(CheckAuth, walletBalance);

export default router;
