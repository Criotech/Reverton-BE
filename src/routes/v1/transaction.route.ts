import express from 'express';
import CheckAuth from '../../middlewares/checkAuth.middleware';
import {
  fetchUserTransactins
} from '../../controllers/transaction.controllers';

const router = express.Router();

router
  .route('/')
  .get(CheckAuth, fetchUserTransactins);

export default router;
