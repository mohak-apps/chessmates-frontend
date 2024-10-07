import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  board,
  setBoard,
  chess,
  socket,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  chess: any;
  setBoard: any;
}) => {
  const [from, setFrom] = useState<Square | null>(null);

  return (
    <div className="text-white-200 ">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                (8 - i)) as Square;

              return (
                <div
                  key={j}
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation ?? null);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: { from: from, to: squareRepresentation },
                        })
                      );
                      try {
                        chess.move({
                          from: from,
                          to: squareRepresentation,
                        });
                        setFrom(null);
                        setBoard(chess.board());
                      } catch (err) {
                        console.log(err);
                        setFrom(null);
                      }
                    }
                  }}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-teal" : "bg-parchment"
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? (
                        <img
                          className="w-10"
                          src={
                            square.color === "b"
                              ? `/src/assets/${square.type}.png`
                              : `/src/assets/${square.type.toUpperCase()}_.png`
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
