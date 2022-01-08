/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { CreateUserPayload, UpdateUserPayload } from '../controllers/user.controller';
import UserModel from '../models/user.model';
import { randomDigit } from '../utils/utils';
import ApiError from '../utils/ApiError';

const createUser = async (userBody: CreateUserPayload) => {
  if (await UserModel.findByEmail(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const emailToken = randomDigit();
  const expires = moment().add(7, 'days');
  const data = {
    ...userBody,
    emailVerificationToken: emailToken,
    emailVerificationExpires: expires
  };

  return UserModel.create(data);
};

const verifyEmail = async (data: { email: string; token: string }) => {
  const { email, token } = data;
  const user = await UserModel.findByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updateEmailStatus = await UserModel.findOneAndUpdate(
    { emailVerificationToken: token, emailVerificationExpires: { $gt: new Date() } },
    { $set: { isEmailVerified: true } },
    { new: true },
  );

  if (!updateEmailStatus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email verification failed');
  }

  return { message: 'Email verified successfully' };
};

const updateUserProfile = async (userId: string, userBody: UpdateUserPayload) => {
  const updateProfile = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: userBody },
    { new: true },
  );

  if (!updateProfile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return updateProfile;
  }
};

const fetchUser = async (userId: string) => {
  const user = await UserModel.findById(userId).select('_id dp fullName email isAdmin gender phone');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  } else {
    return user;
  }
};

const forgotPassword = async (email: string) => {
  const token = randomDigit();
  const expires = moment().add(1, 'days');

  const updated = await UserModel.findOneAndUpdate(
    { email },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: expires
      }
    },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong, try again later');
  } else {
    return token.toString();
  }
};

const resetPassword = async (token: string, email: string, newPassword: string) => {
  const hashNewPassword = await bcrypt.hash(newPassword, 8);

  const updated = await UserModel.findOneAndUpdate(
    { resetPasswordToken: token, email, resetPasswordExpires: { $gt: new Date() } },
    { $set: { password: hashNewPassword } },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return 'Password reset successful';
  }
};

const updatePassword = async (userId: string, userPassword: string, oldPassword: string, newPassword: string) => {
  const match = await bcrypt.compare(oldPassword, userPassword);

  if (!match) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password');
  }

  const hashNewPassword = await bcrypt.hash(newPassword, 8);

  const updated = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: { password: hashNewPassword } },
    { new: true },
  );

  if (!updated) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Operation failed');
  } else {
    return 'Password changed successful';
  }
};

export {
  createUser,
  verifyEmail,
  updateUserProfile,
  fetchUser,
  forgotPassword,
  resetPassword,
  updatePassword
};
