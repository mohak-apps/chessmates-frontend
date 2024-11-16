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
        <div className=" flex-col min-h-full">
          <div className="h-20 w-full  flex flex-row ">
            <img src="/fight.png" className="h-full" />
            <div className="p-5">
              <div className="text-defaultText">Player vs Player</div>
              <div className="text-defaultText text-xs">
                Play with Bot from Easy to Master for free
              </div>
            </div>
          </div>
          <div
            className="h-80 bg-secondaryBackground rounded-lg min-w-56 justify-between flex flex-col box group cursor-pointer"
            onClick={() => navigate("/game")}
          >
            <div> </div>
            <div>
              <ButtonUI
                className="rounded-t-none h-16 text-2xl min-w-56 group-hover:bg-buttonHover"
                onClick={() => {}}
              >
                Player vs Player
              </ButtonUI>
            </div>
          </div>
        </div>
        <div className=" flex-col min-h-full">
          <div className="h-20 w-full flex flex-row ">
            <img src="/robo.png" className="h-full" />
            <div className="p-5">
              <div className="text-defaultText">Player vs Bots</div>
              <div className="text-defaultText text-xs">
                Play with Bot from Easy to Master for free
              </div>
            </div>
          </div>
          <div className="h-80 bg-secondaryBackground rounded-lg min-w-56 justify-between flex flex-col box group cursor-pointer">
            <div> </div>
            <div>
              <ButtonUI
                className="rounded-t-none h-16 text-2xl min-w-56 group-hover:bg-buttonHover"
                onClick={() => {
                  navigate("/bot");
                }}
              >
                Player vs Bot
              </ButtonUI>
            </div>
          </div>
        </div>
        <div className=" flex-col min-h-full">
          <div className="h-20 w-full  flex flex-row ">
            <img src="/puzzle.png" className="h-full" />
            <div className="p-5">
              <div className="text-defaultText">Puzzles</div>
              <div className="text-defaultText text-xs">
                Play with Bot from Easy to Master for free
              </div>
            </div>
          </div>
          <div className="h-80 bg-secondaryBackground rounded-lg min-w-56 justify-between flex flex-col box group cursor-pointer">
            <div> </div>
            <div>
              <ButtonUI
                className="rounded-t-none h-16 text-2xl min-w-56 group-hover:bg-buttonHover"
                onClick={() => {
                  navigate("/bot");
                }}
              >
                Puzzles
              </ButtonUI>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
