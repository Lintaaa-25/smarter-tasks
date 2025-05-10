import React from "react";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
import Layout from "./Layout";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import Signin from "./pages/Signin";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/Notfound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/tasks", element: <TaskListPage /> },
      { path: "/tasks/:id", element: <TaskDetailsPage /> },
    ],
  },
  {
    path: "/notfound",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
