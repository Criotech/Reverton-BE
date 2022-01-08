import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import UserModel from '../models/user.model';

import { catchAsync } from '../utils/catchAsync';

export interface RequestWithUser<T> extends Request {
  user: any;
}

interface Decoded {
  _id: string;
}

const CheckAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Auth Failed');
  }
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as Decoded;
  const user = await UserModel.findById(decoded._id);
  if (user) {
    req.user = user;
    next();
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Auth Failed');
  }
});

export default CheckAuth;
