import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const ProtectedRouter = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (!isAuthenticated) return <Navigate to="/account" />;
  else return <Outlet />;
};
