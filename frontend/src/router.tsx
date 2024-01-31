import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/root';
import {
  ErrorPage,
  Main,
  Swap,
  Contracts,
  Contract,
  Gecko
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/swap',
        element: <Swap />,
      },
      {
        path: '/contracts',
        element: <Contracts />,
      },
      {
        path: '/contracts/:contractId',
        element: <Contract />,
      },
      {
        path: '/gecko',
        element: <Gecko />,
      },
    ],
  },
]);

export default router;
