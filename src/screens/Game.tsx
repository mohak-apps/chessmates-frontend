import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { ButtonUI } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { GameResult, User } from "@/types";
import { useAuthContext } from "@/contexts/UserAuthContext";
import { Toaster } from "react-hot-toast";

// code duplicate
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const TURN = "turn";
export const GAME_OVER = "game_over";
export const LOADING = "loading";

const Game = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const { user } = useAuthContext();
  const [currentState, setCurrentState] = useState<GameResult | null>(null);
  const [opponent, setOpponent] = useState<User | null>(null);
  const [gameId, setGameId] = useState<string>("");
  const [turn, setTurn] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case LOADING: {
          setCurrentState(GameResult.Loading);
          break;
        }
        case INIT_GAME: {
          setGameId(message.payload.gameId);
          setOpponent(message.payload.opponent);
          setBoard(chess.board());
          setColor(message.payload.color);
          setTurn(message.payload.turn);
          setCurrentState(GameResult.InProgress);
          break;
        }
        case MOVE: {
          console.log("Move", message.payload.move);
          const move = message.payload.move;
          chess.move(move);
          setBoard(chess.board());
          break;
        }
        case TURN: {
          setTurn(message.payload.turn);
          console.log(turn);
          break;
        }
        case GAME_OVER: {
          console.log("Game over");
          break;
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex">
      <div className="w-2/12"></div>
      <div className="w-6/12">
        <div className="col-span-4 w-full flex items-center border-2 flex-col">
          <div>{opponent?.name || "Waiting for the opponent"}</div>
          <div className="col-span-4 w-full flex justify-center border-2 flex-row">
            <ChessBoard
              gameId={gameId}
              board={board}
              socket={socket}
              chess={chess}
              setBoard={setBoard}
              currentState={currentState}
              turn={turn}
              color={color}
            />
          </div>
          <div>{user?.name}</div>
          <div className="w-full">
            <Toaster
              position="top-center"
              containerStyle={{
                position: "relative",
              }}
              toastOptions={{
                duration: 750,
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-sidePanel flex shadow-2xl rounded-lg flex-col items-center p-7 w-2/12">
        <div className="">
          {currentState === GameResult.Loading ? (
            <progress className="progress w-56"></progress>
          ) : (
            !currentState && (
              <ButtonUI
                className="w-24 mb-7"
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                      user: user,
                    })
                  );
                }}
              >
                Start Game
              </ButtonUI>
            )
          )}
        </div>
        <div className="bg-sidePanelShadow shadow-inner justify-center flex rounded-lg  w-full h-full"></div>
      </div>
      <div className="w-2/12"></div>
    </div>
  );
};

export default Game;
