import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { ButtonUI } from "../components/Button";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

// code duplicate
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";
export const PENDING = "pending";

const Game = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [pending, setPending] = useState(false);
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case PENDING: {
          console.log("pending");
          setPending(true);
          break;
        }
        case INIT_GAME: {
          setPending(false);
          setBoard(chess.board());
          console.log("Game initialized");
          setStarted(true);
          break;
        }
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
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
    <div className="flex flex-grow">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 w-full flex justify-center">
            <ChessBoard
              board={board}
              socket={socket}
              chess={chess}
              setBoard={setBoard}
            />
          </div>
          <div className="col-span-2 bg-sidePanel flex shadow-2xl rounded-lg flex-col items-center p-7">
            <div className="">
              {pending ? (
                <progress className="progress w-56"></progress>
              ) : (
                !started && (
                  <ButtonUI
                    className="w-24 mb-7"
                    onClick={() => {
                      socket.send(
                        JSON.stringify({
                          type: INIT_GAME,
                        })
                      );
                    }}
                  >
                    Play
                  </ButtonUI>
                )
              )}
            </div>
            <div className="bg-sidePanelShadow shadow-inner justify-center flex rounded-lg  w-full h-full">
              asd
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
