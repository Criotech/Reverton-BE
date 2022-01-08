/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import mongoose, { Schema, Document, Model } from 'mongoose';
import { ITransaction } from '../interfaces/transaction.interface';

export interface ITransactionDocument extends ITransaction, Document {
}

interface ITransactionModel extends Model<ITransactionDocument> {
}

const TransactionSchema: Schema<ITransactionDocument> = new Schema(
  {
    amount: {
      type: String,
      required: true
    },
    transactionType: {
      type: String,
      enum: ['topup', 'phcn']
    },
    sender: {
      type: String
    },
    balance: {
      type: String,
      required: true
    },
    destination: {
      type: String
    }
  },
  {
    timestamps: true
  },
);

const TransactionModel = mongoose.model<ITransactionDocument, ITransactionModel>('Transaction', TransactionSchema);
export default TransactionModel;
