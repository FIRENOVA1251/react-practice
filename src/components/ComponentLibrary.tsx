import React from "react";
import "../styles/Components.css";

const ComponentLibrary: React.FC = () => {

  const handleDragStart = (event: React.DragEvent, type: "image" | "text") => {
    event.dataTransfer.setData("componentType", type);
  };

  return (
    <div>
      <div
        className="components-label"
        draggable
        onDragStart={(e) => handleDragStart(e, "image")}
      >
        Image Component
      </div>

      <div
        className="components-label"
        draggable
        onDragStart={(e) => handleDragStart(e, "text")}
      >
        Text Component
      </div>
    </div>
  );
};

export default ComponentLibrary;
