// /* eslint-disable func-names */

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import httpStatus from 'http-status';
// import { authLimiter } from'./middlewares/rateLimiter';
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
// eslint-disable-next-line import/no-unresolved
import ApiError from './utils/apiError';

// Database
import db from './config/database';

dotenv.config();

const app = express();

db();

app.use(morgan('dev'));
morganBody(app);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/v1/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
