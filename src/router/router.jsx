import PrivateRoutes from "@/components/auth-state/PrivateRoutes";
import PublicRoutes from "@/components/auth-state/PublicRoutes";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/main/Home"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));

const withSuspense = (Component, routeType) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routeType === "privateRoutes" ? (
        <PrivateRoutes>
          <Component />
        </PrivateRoutes>
      ) : (
        <PublicRoutes>
          <Component />
        </PublicRoutes>
      )}
    </Suspense>
  );
};

export const router = createBrowserRouter([
  {
    path: "/home",
    element: withSuspense(Home, "privateRoutes"),
  },
  {
    path: "/login",
    element: withSuspense(Login, "publicRoutes"),
  },
  {
    path: "/register",
    element: withSuspense(Register, "publicRoutes"),
  },
]);
