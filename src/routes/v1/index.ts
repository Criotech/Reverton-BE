import express from 'express';
import userRoute from './user.route';
import walletRoute from './wallet.route';
import transactionRoute from './transaction.route';

const router = express.Router();

interface RouteStructure {
  path: string;
  route: any;
}

const defaultRoutes: RouteStructure[] = [
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/wallet',
    route: walletRoute
  },
  {
    path: '/transactions',
    route: transactionRoute
  }
];

// const devRoutes = [
//   // routes available only in development mode
// ];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (process.env.ENV === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

export default router;
