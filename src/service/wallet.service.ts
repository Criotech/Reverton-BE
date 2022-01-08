/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import WalletModel from '../models/wallet.model';
import ApiError from '../utils/ApiError';

const createWallet = async (userId: string) => {
  if (await WalletModel.findByUserId(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user already taken has a wallet');
  }
  return WalletModel.create({
    userId,
    balance: '0',
    walletAddress: uuidv4()
  });
};

const fetchByWalletById = async (walletId: string) => {
  const wallet = await WalletModel.findById(walletId);

  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  return wallet;
};

const fetchByWalletAddress = async (walletAddress: string) => {
  const wallet = await WalletModel.findOne({ walletAddress });

  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  return wallet;
};

const updateWalletBalance = async (walletAddress: string, amount: number) => {
  const wallet = await fetchByWalletAddress(walletAddress);
  wallet.balance = (+wallet.balance + amount).toFixed(2).toString();

  await wallet.save();

  return wallet;
};

export {
  createWallet,
  fetchByWalletById,
  fetchByWalletAddress,
  updateWalletBalance
};
