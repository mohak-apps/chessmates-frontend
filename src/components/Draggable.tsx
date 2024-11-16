import { useDraggable } from "@dnd-kit/core";

const Draggable = (props: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: props.disable,
  });
  const style = transform
    ? {
        transform: `translate3d(${
          props.isReverse ? -transform.x : transform.x
        }px, ${props.isReverse ? -transform.y : transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      id={props.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
};

export default Draggable;
