import { useAuthContext } from "@/contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(); // Call your logout logic here
    navigate("/login"); // Navigate to login page after logout
  };

  return handleLogout;
};

export default useLogout;
