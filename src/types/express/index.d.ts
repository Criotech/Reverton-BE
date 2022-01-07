import express from 'express';
import { IUserDocument } from '../../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument
    }
  }
}
