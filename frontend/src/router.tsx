import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage, Main } from './pages';

import Root from './routes/root';
import Contract from './pages/Contract';
import Gecko from './pages/Gecko';
import Swap from './pages/Swap';

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
        path: '/contract',
        element: <Contract name="Smart Contract Name" />,
      },
      {
        path: '/gecko',
        element: <Gecko />,
      },
      {
        path: '/swap',
        element: <Swap />,
      }
    ],
  },
]);

export default router;
