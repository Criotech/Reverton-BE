/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
import { userService, emailService, authService } from '../service';

import { catchAsync } from '../utils/catchAsync';

export type CreateUserPayload = Pick<User, 'email' | 'fullName' | 'gender' | 'title' | 'password' | 'isAdmin'>;
export type UpdateUserPayload = Pick<User, 'fullName' | 'gender' | 'title' | 'dob' | 'phone'>;

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  await emailService.sendVerifyAccountEmail(user.email, user.emailVerificationToken);

  res.status(httpStatus.CREATED).send({ message: `A mail have being sent to ${user.email}, Kindly verify you account.`, status: true });
});

const verifyEmail = catchAsync(async (req: Request<{}, {}, { email: string; token: string }>, res: Response) => {
  const resp = await userService.verifyEmail(req.body);
  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const login = catchAsync(async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
  const resp = await authService.login(req.body);
  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const updateUserProfile = catchAsync(async (req: Request<{}, {}, UpdateUserPayload>, res: Response) => {
  const { _id } = req.user;
  const resp = await userService.updateUserProfile(_id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Profile updated successfully', data: resp, status: true });
});

export {
  createUser,
  verifyEmail,
  login,
  updateUserProfile
};
