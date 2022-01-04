/* eslint-disable func-names */
import mongoose, { Schema, Document, Model } from 'mongoose';
import jwt from 'jsonwebtoken';
// import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

import validator from 'validator';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user';

interface AuthJson extends Pick<User, 'title' | 'fullName' | 'isAdmin' | 'gender' > {
    token: boolean
}

export interface IUserDocument extends User, Document {
    checkPassword: (password: string) => Promise<boolean>;
    generateJWT: () => string;
    toAuthJSON: () => AuthJson
}

interface IUserModel extends Model<IUserDocument> {
    findByEmail: (email: string) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female']
    },
    title: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      }
    },
    emailVerificationToken: {
      type: String
    },
    emailVerificationExpires: {
      type: Date
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: Date
    },
    estates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Estate'
      }
    ]
  },
  {
    timestamps: true
  },
);

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE
    },
  );
};

UserSchema.methods.toAuthJSON = function () {
  const {
    title, gender, fullName, email, isAdmin
  } = this;
  return {
    title,
    email,
    fullName,
    isAdmin,
    gender,
    token: this.generateJWT()
  };
};

UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const UserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default UserModel;
