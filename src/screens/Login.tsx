import { Link, useLocation, useNavigate } from "react-router-dom";
import { ButtonUI } from "../components/Button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "@/oauth/helper";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/UserAuthContext";
import { Eye, EyeOffIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import ResetPassword from "@/components/ResetPassword";
import AlertDialog, {} from "@/components/AlertDialog";

const Login = () => {
  const { accessToken, user, setAccessToken, setUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [email, setEmail] = useState<string>(state?.email || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConflict, setShowPasswordConflict] = useState(false);
  const [showInputPasswordModal, setShowInputPasswordModal] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken && user) {
      navigate("/landing", {
        state: JSON.stringify({ user, accessToken }),
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (showPasswordConflict) {
    }
  }, [showPasswordConflict]);

  const googleResponse = async (res: any) => {
    try {
      if (res?.code) {
        const response = await googleAuth(res.code);
        if (response.status === 200) {
          const { user, accessToken } = response.data;
          setAccessToken(accessToken);
          setUser(user);
          navigate("/landing", {
            state: JSON.stringify({ user, accessToken }),
          });
        }
      }
    } catch (err) {
      console.log("Error while requesting Google Code : ", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
  });

  const handleEmailAuth = async () => {
    try {
      if (email && password) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/signin`,
          { email, password, authMethod: "local", rememberMe },
          { withCredentials: true } // Include cookies in the request which has refresh token
        );

        if (response.status === 200) {
          const { user, accessToken } = response.data;
          setAccessToken(accessToken);
          setUser(user);
          navigate("/landing", {
            state: JSON.stringify({ user: user, accessToken }),
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409) {
          setShowPasswordConflict(true);
        }
      } else {
        console.log("Error login using email");
      }
    }
  };

  return (
    <div className="flex flex-grow  items-center justify-center ">
      {showPasswordConflict && (
        <AlertDialog
          setShowPasswordConflict={setShowPasswordConflict}
          showPasswordConflict={showPasswordConflict}
          setShowInputPasswordModal={setShowInputPasswordModal}
        />
      )}
      {showInputPasswordModal && (
        <ResetPassword
          emailText={email}
          showInputPasswordModal={showInputPasswordModal}
          setShowInputPasswordModal={setShowInputPasswordModal}
        />
      )}
      <div className="p-5 grid grid-cols-1 rounded-xl bg-secondaryBackground justify-items-center box items-center w-[400px] h-5/6">
        <img src="/logo.png" className="w-48 h-48" />
        <div className="w-full">
          <div className="mt-4 w-full">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-defaultText placeholder:text-defaultText focus:placeholder-defaultText placeholder:opacity-50"
            />
          </div>
          <div className="mt-4 w-full relative flex items-center">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="text-defaultText placeholder:text-defaultText focus:placeholder-defaultText placeholder:opacity-50"
            />
            <span className="absolute right-2 cursor-pointer">
              {showPassword ? (
                <Eye
                  className=" text-buttonBackground2 hover:text-buttonHover2"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOffIcon
                  className=" text-buttonBackground2 hover:text-buttonHover2"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </span>
          </div>
          <div className="flex w-full justify-between mt-1">
            <div className="flex items-center">
              <Checkbox
                id="terms"
                className="border-defaultText flex-shrink-0"
                checked={rememberMe}
                onCheckedChange={(isChecked) =>
                  setRememberMe(isChecked as boolean)
                }
              />
              <label
                htmlFor="terms"
                // className="absolute whitespace-nowrap select-none ml-5 mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-defaultText"
                className="whitespace-nowrap select-none ml-1 text-sm mt-1.5 text-defaultText font-medium leading-none"
              >
                Remember me
              </label>
            </div>
            <div className="mt-1">
              <Link
                to="/"
                className="whitespace-nowrap select-none ml-1 text-xs text-defaultText font-medium leading-none"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex-col">
          <div className="mt-4 w-full">
            <ButtonUI onClick={handleEmailAuth}>Log in</ButtonUI>
          </div>
          <div className="h-10 mt-5 flex items-center justify-center font-thin">
            - Or -
          </div>
          <div className="mt-4 w-full relative flex items-center">
            <img
              src="/googlelogo.svg"
              alt="Example SVG Image"
              className="absolute pl-3"
            />
            <ButtonUI
              onClick={googleLogin}
              className="bg-buttonBackground2 hover:bg-buttonHover2"
            >
              Login with Google
            </ButtonUI>
          </div>
          <Link
            to="/register"
            className="m-4 text-defaultText flex justify-center no-underline"
          >
            <div>
              Don't have an account?
              <span className="ml-2 underline">Sign Up</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
