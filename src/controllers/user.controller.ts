/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
import {
  userService, emailService, authService, fileUploadService
} from '../service';

import { catchAsync } from '../utils/catchAsync';

export type CreateUserPayload = Pick<User, 'email' | 'fullName' | 'gender' | 'title' | 'password' | 'isAdmin'>;
export type UpdateUserPayload = {
    fullName?: string;
    gender?: string;
    title?: string;
    dob?: string;
    phone?: string;
    dp?: {
        url: string;
        id: string;
    }
}

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

const updateProfilePic = catchAsync(async (req: Request, res: Response) => {
  const { _id, dp } = req.user;

  const { path } = req.file;

  if (dp.url) {
    await fileUploadService.DeleteFile(dp.id);
  }

  const upload = await fileUploadService.UploadFile(path);

  const resp = await userService.updateUserProfile(_id, { dp: { id: upload.public_id, url: upload.url } });

  res.status(httpStatus.CREATED).send({ message: 'Profile picture updated successfully', data: resp, status: true });
});

const getAuthUser = catchAsync(async (req: Request, res: Response) => {
  const {
    _id, dp, fullName, email, isAdmin, gender, phone
  } = req.user;

  res.status(httpStatus.CREATED).send({
    message: 'fetched successfully',
    data: {
      _id, dp, fullName, email, isAdmin, gender, phone
    },
    status: true
  });
});

const fetchAUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await userService.fetchUser(userId);
  res.status(httpStatus.CREATED).send({
    message: 'fetched successfully',
    data: user,
    status: true
  });
});

export {
  createUser,
  verifyEmail,
  login,
  updateUserProfile,
  updateProfilePic,
  getAuthUser,
  fetchAUser
};
