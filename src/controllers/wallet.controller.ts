/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import {
  userService, emailService, paystackService, walletService, transactionService
} from '../service';
import { catchAsync } from '../utils/catchAsync';

const fundWallet = catchAsync(async (req: Request, res: Response) => {
  const { _id, fullName, email } = req.user;

  const payload = {
    amount: +req.body.amount,
    email,
    fullName,
    userId: _id
  };

  const initializePayment = await paystackService.initializeDeposit(payload);

  res.status(httpStatus.CREATED).send({ message: 'Payment Initialized.', data: initializePayment, status: true });
});

const verifyDeposit = catchAsync(async (req: Request, res: Response) => {
  const { walletId } = req.user;

  const verifyPayment = await paystackService.verifyDeposit(req.params.referenceId);

  if (verifyPayment.status === 'success') {
    const wallet = await walletService.fetchByWalletById(walletId);
    if (wallet.reference === req.params.referenceId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'ReferenceId expired');
    }
    wallet.reference = req.params.reference;
    await wallet.save();
    const updateWalletBalance = await walletService.updateWalletBalance(wallet.walletAddress, verifyPayment.amount / 100);

    await transactionService.addTransaction({
      amount: (verifyPayment.amount / 100).toFixed(2).toString(),
      balance: updateWalletBalance.balance,
      transactionType: 'topup',
      sender: verifyPayment.reference,
      destination: wallet.walletAddress
    });

    res.status(httpStatus.CREATED).send({ message: 'Deposit Successfull.', data: updateWalletBalance, status: true });
  } else {
    res.status(httpStatus.BAD_REQUEST).send({ message: 'Deposit Failed.', data: null, status: true });
  }
});

const walletBalance = catchAsync(async (req: Request, res: Response) => {
  const { walletId } = req.user;

  const wallet = await walletService.fetchByWalletById(walletId);

  res.status(httpStatus.BAD_REQUEST).send({ message: 'Deposit Failed.', data: wallet, status: true });
});

export {
  fundWallet,
  verifyDeposit,
  walletBalance
};
