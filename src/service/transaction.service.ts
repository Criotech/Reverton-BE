/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
// import httpStatus from 'http-status';
import TransactionModel from '../models/transaction.model';
// import ApiError from '../utils/ApiError';
import { ITransaction } from '../interfaces/transaction.interface';

const addTransaction = async (payload: ITransaction) => TransactionModel.create(payload);

const fetchUserTransactins = async (walletAddress: string) => {
  const transactions = TransactionModel.find({ $or: [{ sender: walletAddress }, { destination: walletAddress }] });

  return transactions;
};

export {
  addTransaction,
  fetchUserTransactins
};
