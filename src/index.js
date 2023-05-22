import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import UserDashboard, { dataLoader } from './UserDashboard/UserDashbord';
import ErrorPage from './UserDashboard/ErrorPage';
import Layout from './Layout/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        path="/user/:id"
        element={<UserDashboard />}
        loader={dataLoader}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)