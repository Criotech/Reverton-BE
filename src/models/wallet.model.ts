/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import mongoose, { Schema, Document, Model } from 'mongoose';
import { IWallet } from '../interfaces/wallet.interface';

export interface IWalletDocument extends IWallet, Document {
}

interface IWalletModel extends Model<IWalletDocument> {
    findByUserId: (userId: string) => Promise<IWalletDocument>;
}

const WalletSchema: Schema<IWalletDocument> = new Schema(
  {
    balance: {
      type: String,
      default: '0'
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true
    },
    reference: {
      type: String
    }
  },
  {
    timestamps: true
  },
);

WalletSchema.statics.findByUserId = function (userId: string) {
  return this.findOne({ userId });
};

const WalletModel = mongoose.model<IWalletDocument, IWalletModel>('Wallet', WalletSchema);
export default WalletModel;
