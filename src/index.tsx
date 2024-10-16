import React from 'react';
import {createRoot} from 'react-dom/client';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import App from './App';
import {AppRoute} from './config/app-route';
import DevopsProjectForm from './pages/DevopsPipelinePage';
import {HomePage} from './pages/HomePage';

const div = document.getElementById('root')!;
const root = createRoot(div);

const router = createHashRouter([
  {
    path: AppRoute.HOME,
    element: <App />,
    children: [
      {
        path: AppRoute.HOME,
        element: <HomePage />,
      },
      {
        path: AppRoute.DEVOPS_PIPELINES,
        element: <DevopsProjectForm />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
