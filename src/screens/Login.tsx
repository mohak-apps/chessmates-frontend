import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="mt-4 flex justify-center">
          <Button onClick={() => {}}>Sign In</Button>
          <Text plac />
          <Text />
        </div>
        <div>--- Or continue ---</div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => {}}>Login with Google</Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => {}}>Login with Facebook</Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => {}}>Login with Apple</Button>
        </div>
        <div>--- Or ---</div>
        <div>
          Dont have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div>
        <img src="" />
      </div>
    </div>
  );
};
