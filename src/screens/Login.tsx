import { Link, useNavigate } from "react-router-dom";
import { ButtonUI } from "../components/Button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "@/oauth/helper";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/UserAuthContext";
import axios from "axios";

const Login = () => {
  const { accessToken, user, setAccessToken, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  console.log(accessToken, user);
  useEffect(() => {
    if (accessToken && user) {
      navigate("/landing", {
        state: JSON.stringify({ user, accessToken }),
      });
    }
  }, [accessToken]);

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

  const handleEmailAuth = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      if (email && password) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/auth/signin`,
          { email, password, authMethod: "local" },
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
    } catch (err) {
      console.log("Error login using email");
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="p-5 grid grid-cols-1 rounded-xl z-10 bg-secondaryBackground justify-items-center">
        <img src="/logo.png" className="w-48 h-48" />
        <div className="mt-4 w-full">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
          />
        </div>
        <div className="mt-4 w-full">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="text-defaultText placeholder-defaultText focus:placeholder-gray-500"
          />
        </div>
        <div className="flex w-full justify-between">
          <div className="inline-block relative">
            <div className="absolute">
              <Checkbox
                id="terms"
                className="mt-2 border-defaultText"
                checked={rememberMe}
                onCheckedChange={(isChecked) =>
                  setRememberMe(isChecked as boolean)
                }
              />
            </div>
            <label
              htmlFor="terms"
              className="absolute whitespace-nowrap select-none ml-5 mt-2.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-defaultText"
            >
              Remember me
            </label>
          </div>
          <div className="mt-1">
            <Link
              to="/"
              className="ml-1 textarea-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-defaultText hover:text-khaki hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="mt-4 w-full">
          <ButtonUI
            onClick={() => handleEmailAuth(email, password, rememberMe)}
          >
            Log in
          </ButtonUI>
        </div>
        <div className="mt-4 w-full">
          <ButtonUI onClick={googleLogin}>Login with Google</ButtonUI>
        </div>
        <div className="mt-4 w-full">
          <ButtonUI onClick={() => {}}>Login with Facebook</ButtonUI>
        </div>
        <div className="mt-4 w-full">
          <ButtonUI onClick={() => {}}>Login with Apple</ButtonUI>
        </div>
        <div className="m-4 text-defaultText">
          Dont have an account?
          <Link to="/register"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
