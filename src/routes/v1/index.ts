import express from 'express';
import userRoute from './user.route';

const router = express.Router();

interface RouteStructure {
  path: string;
  route: any;
}

const defaultRoutes: RouteStructure[] = [
  {
    path: '/users',
    route: userRoute
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
