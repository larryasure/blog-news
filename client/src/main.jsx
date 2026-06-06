`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminProtectedRoute from "./context/AdminProtectedRoute";
import AuthProvider from "./context/AuthContext";
import ProtectedRoutes from "./context/ProtectedRoutes";
import RoleProtectedRoute from "./context/RoleProtectedRoute";
import AdminCategories from "./dashboard/admin/AdminCategories";
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import AdminLayout from "./dashboard/admin/AdminLayout";
import AdminPost from "./dashboard/admin/AdminPost";
import AdminUsers from "./dashboard/admin/AdminUsers";
import Create_post from "./dashboard/Create_post";
import Layout from "./dashboard/Layout";
import Post_detail from "./dashboard/Post_detail";
import Posts from "./dashboard/Posts";
import "./index.css";
import Rootlayout from "./roots/Rootlayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,

    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <ErrorPage /> },

      {
        path: "dashboard",

        element: (
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        ),

        children: [
          { index: true, element: <Posts /> },

          {
            path: "create_post",

            element: (
              <RoleProtectedRoute isAllowed={["author", "admin", "superuser"]}>
                <Create_post />
              </RoleProtectedRoute>
            ),
          },
          { path: "post/:slug", element: <Post_detail /> },
          { path: "posts", element: <Posts /> },
        ],
      },

      {
        path: "admin",

        element: (
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <AdminUsers /> },
          { path: "posts", element: <AdminPost /> },
          { path: "categories", element: <AdminCategories /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
`