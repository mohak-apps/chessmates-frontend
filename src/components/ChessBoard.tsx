import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import toast from "react-hot-toast";
import { GameResult } from "@/types";

export const ChessBoard = ({
  gameId,
  board,
  setBoard,
  chess,
  socket,
  currentState,
  turn,
  color,
}: {
  gameId: string;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  chess: Chess;
  setBoard: any;
  currentState: GameResult | null;
  turn: boolean;
  color: string;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [showFilesRanks, setShowFilesRanks] = useState<boolean>(true);
  const handleDragStart = (event: any) => {
    const square = event.active.id.slice(-2);
    setFrom(square);
  };

  const handleDragEnd = (event: any) => {
    const square = event.over.id;
    handleMove(square);
  };

  const handleMove = (squareRepresentation: any) => {
    try {
      const move = chess.move({
        // handling UI moves
        from: from!,
        to: squareRepresentation,
      });

      setBoard(chess.board());

      //if above does not throw any err, then only send to socket
      socket.send(
        JSON.stringify({
          type: MOVE,
          payload: {
            gameId,
            move,
          },
        })
      );

      setFrom(null);
    } catch (err: any) {
      setFrom(null);
      console.error(err.message);
      if (!(from === squareRepresentation)) {
        toast.error("Invalid move!");
      }
    }
  };

  const FilesRanks = ({ i, j }: { i: number; j: number }) => {
    return (
      <div className="group">
        <div
          className={`absolute -left-5 mt-5 ${
            color === "black" && "rotate-180 -right-5"
          }`}
        >
          {j === 0 && 8 - i}
        </div>
        <div
          className={`
            absolute ml-6
            ${
              color === "black"
                ? "group-[]:-top-8 group-[]:rotate-180"
                : "rotate-0 -bottom-8"
            }
          `}
        >
          {i === 0 && String.fromCharCode(j + 1 + 64)}
        </div>
      </div>
    );
  };

  return (
    <div className="p-10 bg-thickBorder rounded-md shadow-2xl">
      <div
        className={`text-white-200 border-4 border-bordersDividers rounded-md shadow-2xl relative ${
          color === "black" && "rotate-180"
        }`}
      >
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {board.map((row, i) => {
            return (
              <div key={i} className="flex ">
                {row.map((square, j) => {
                  const squareRepresentation = (String.fromCharCode(
                    97 + (j % 8)
                  ) +
                    (8 - i)) as Square;
                  return (
                    <Droppable
                      id={squareRepresentation}
                      key={j}
                      className="relative"
                    >
                      <div
                        key={j}
                        // onClick={() => handleOnClick(squareRepresentation)}
                        className={`w-16 h-16 ${
                          (i + j) % 2 === 0
                            ? "bg-whiteSquare"
                            : "bg-blackSquare"
                        }`}
                      >
                        {showFilesRanks && <FilesRanks i={i} j={j} />}

                        <div className="w-full justify-center flex h-full">
                          <div className="h-full justify-center flex flex-col">
                            {square ? (
                              <Draggable
                                id={`piece ${
                                  square.color + square.type + square.square
                                }`}
                                disable={
                                  !(
                                    currentState === GameResult.InProgress &&
                                    turn
                                  )
                                }
                                isReverse={color === "black"}
                              >
                                <img
                                  className={`w-10 ${
                                    color === "black" && "rotate-180"
                                  }`}
                                  src={
                                    square.color === "b"
                                      ? `/src/assets/${square.type}.png`
                                      : `/src/assets/${square.type.toUpperCase()}_.png`
                                  }
                                />
                              </Draggable>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Droppable>
                  );
                })}
              </div>
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};
