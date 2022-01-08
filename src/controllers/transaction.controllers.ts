/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import {
  transactionService,
  walletService
} from '../service';

import { catchAsync } from '../utils/catchAsync';

const fetchUserTransactins = catchAsync(async (req: Request, res: Response) => {
  const { walletId } = req.user;

  const wallet = await walletService.fetchByWalletById(walletId);
  const user = await transactionService.fetchUserTransactins(wallet.walletAddress);
  res.status(httpStatus.CREATED).send({
    message: 'fetched successfully',
    data: user,
    status: true
  });
});

export {
  fetchUserTransactins
};
