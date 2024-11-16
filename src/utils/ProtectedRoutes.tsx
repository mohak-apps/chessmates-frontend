import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/contexts/UserAuthContext";

const ProtectedRoutes = () => {
  const { accessToken } = useAuthContext();

  return !!accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
