/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import moment from 'moment';
import { CreateUserPayload, UpdateUserPayload } from '../controllers/user.controller';
import UserModel from '../models/user.model';
import { randomDigit } from '../utils/utils';
import ApiError from '../utils/ApiError';
import { User } from '../interfaces/user.interface';

const createUser = async (userBody: CreateUserPayload): Promise<User> => {
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

const updateUserProfile = async (userId: string, userBody: UpdateUserPayload): Promise<User> => {
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

export {
  createUser,
  verifyEmail,
  updateUserProfile
};
