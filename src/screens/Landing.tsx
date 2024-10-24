import { useNavigate } from "react-router-dom";
import { ButtonUI } from "../components/Button";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { useAuthContext } from "@/contexts/UserAuthContext";
import useLogout from "@/hooks/useLogOut";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const handleLogout = useLogout();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <div className="px-44">
      <div className="flex-row grid gap-x-48 gap-y-4 grid-cols-3">
        <div className="flex-col border-red-500">
          <div
            className="h-80 bg-secondaryBackground rounded-lg min-w-56"
            onClick={handleLogout}
          >
            Welcome {userInfo?.name}
          </div>
          <div>
            <ButtonUI
              className="rounded-t-none h-16 text-2xl min-w-56"
              onClick={() => {
                navigate("/game");
              }}
            >
              Player vs Player
            </ButtonUI>
          </div>
        </div>
        <div className=" flex-col min-h-full">
          <div className="h-80 bg-secondaryBackground rounded-lg min-w-56">
            asd
          </div>
          <div>
            <ButtonUI
              className="rounded-t-none h-16 text-2xl min-w-56"
              onClick={() => {
                navigate("/bot");
              }}
            >
              Player vs Bot
            </ButtonUI>
          </div>
        </div>
        <div className="flex-col min-h-full">
          <div className="h-80 bg-secondaryBackground rounded-lg min-w-56">
            asd
          </div>
          <div>
            <ButtonUI
              className="rounded-t-none h-16 text-2xl min-w-56"
              onClick={() => {
                navigate("/game");
              }}
            >
              Puzzles
            </ButtonUI>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
