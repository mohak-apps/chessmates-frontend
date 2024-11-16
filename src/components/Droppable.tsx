import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: any) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });
 

  return (
    <div id={props.id} ref={setNodeRef}>
      {props.children}
    </div>
  );
};

export default Droppable;
