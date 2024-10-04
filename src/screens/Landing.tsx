import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-md">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={"/chessboard.jpg"} className="max-w-96" />
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold">Play Chess Online!</h1>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => {
                  navigate("/game");
                }}
              >
                Play online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
