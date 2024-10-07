import { Link, useNavigate } from "react-router-dom";
import { ButtonUI } from "../components/Button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-primaryBackground ">
      <div className="p-5 grid grid-cols-1 rounded-xl z-10 bg-secondaryBackground justify-items-center">
        <img src="/logo.png" className="w-48 h-48" />
        <div className="mt-4">
          <Input type="email" placeholder="Email" />
        </div>
        <div className="mt-4">
          <Input type="password" placeholder="Password" />
        </div>
        <div className="flex w-full justify-between">
          <div className="inline-block relative">
            <div className="absolute">
              <Checkbox id="terms" className="mt-2 border-primaryText" />
            </div>
            <label
              htmlFor="terms"
              className="absolute whitespace-nowrap ml-5 mt-2.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primaryText"
            >
              Remember me
            </label>
          </div>
          <div className="mt-1">
            <Link
              to="/"
              className="ml-1 textarea-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primaryText hover:text-khaki hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <ButtonUI onClick={() => {}}>Log in</ButtonUI>
        </div>
        <div className="m-4 text-defaultText">--- Or continue ---</div>
        <div className="mt-4">
          <ButtonUI onClick={() => {}}>Login with Google</ButtonUI>
        </div>
        <div className="mt-4">
          <ButtonUI onClick={() => {}}>Login with Facebook</ButtonUI>
        </div>
        <div className="mt-4">
          <ButtonUI onClick={() => {}}>Login with Apple</ButtonUI>
        </div>
        <div className="m- text-defaultText">--- Or ---</div>
        <div className="m-4 text-defaultText">
          Dont have an account?
          <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
