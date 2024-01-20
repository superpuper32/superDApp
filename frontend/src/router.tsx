import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage, Main } from './pages';

import Root from './routes/root';
import Contract from './pages/Contract';

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
      }
    ],
  },
]);

export default router;
