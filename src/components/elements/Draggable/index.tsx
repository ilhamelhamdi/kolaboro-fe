import React, { useState, useRef } from "react";

type Axis = { x: number; y: number };

const calculateNewPosition = (current: Axis, delta: Axis): Axis => ({
  x: current.x + delta.x,
  y: current.y + delta.y,
});

const constrainToNegativeBound = (position: Axis): Axis => ({
  x: Math.max(0, position.x),
  y: Math.max(0, position.y),
});

export interface DraggableProps {
  children: React.ReactNode;
  isDraggable?: boolean;
  initialPosition?: Axis;
  onDragEnd?: (x: number, y: number) => void;
  isBoundedToParent?: boolean;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  isDraggable = true,
  initialPosition,
  onDragEnd,
  isBoundedToParent = true,
}) => {
  const [position, setPosition] = useState<Axis>(initialPosition || { x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const startDrag = (
    initialPoint: Axis,
    addEventListeners: (onMove: (point: Axis) => void, onEnd: () => void) => void
  ) => {
    let lastPoint = initialPoint;
    let currentPosition = position; // Capture the current position in a local immutable variable

    const onMove = (currentPoint: Axis) => {
      const delta: Axis = {
        x: currentPoint.x - lastPoint.x,
        y: currentPoint.y - lastPoint.y,
      };

      lastPoint = currentPoint;

      currentPosition = isBoundedToParent
        ? constrainToNegativeBound(calculateNewPosition(currentPosition, delta))
        : calculateNewPosition(currentPosition, delta);

      setPosition(currentPosition); // Update React state
    };

    const onEnd = () => {
      if (onDragEnd && currentPosition !== position) {
        onDragEnd(currentPosition.x, currentPosition.y); // Use the local variable for the most up-to-date position
      }
    };

    addEventListeners(onMove, onEnd);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    if (e.button !== 0) return; // Only proceed if the left mouse button is clicked
    e.preventDefault();

    startDrag({ x: e.clientX, y: e.clientY }, (onMove, onEnd) => {
      const handleMouseMove = (event: MouseEvent) => onMove({ x: event.clientX, y: event.clientY });
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        onEnd();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    e.preventDefault();
    const touch = e.touches[0];

    startDrag({ x: touch.clientX, y: touch.clientY }, (onMove, onEnd) => {
      const handleTouchMove = (event: TouchEvent) =>
        onMove({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        onEnd();
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    });
  };

  return (
    <div
      ref={nodeRef}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDraggable ? "move" : "default",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};

export default Draggable;
