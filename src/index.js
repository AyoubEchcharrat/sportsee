import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import UserDashboard from './userDashboard/UserDashbord';
import ErrorPage from './userDashboard/ErrorPage';
import Layout from './layout/Layout';
import { dataLoader } from './utility/Index';

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