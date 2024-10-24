import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/contexts/UserAuthContext";

export interface PrivateRouteContext {
  logOut: () => void;
}

const PrivateRoutes = () => {
  const { accessToken } = useAuthContext();

  return !!accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
