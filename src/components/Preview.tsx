import React from "react";
import "../styles/Preview.css";

import { DEFAULT_TEXT, DEFAULT_IMAGE_URL } from "../constants";

interface ComponentData {
  id: number;
  type: "image" | "text";
  style: React.CSSProperties;
  src?: string;
  text?: string;
}

interface PreviewProps {
  components: ComponentData[];
  onDropComponent: (type: "image" | "text") => void;
  onSelectComponent: (component: ComponentData) => void;
}

const Preview: React.FC<PreviewProps> = ({
  components,
  onDropComponent,
  onSelectComponent,
}) => {
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Stop default event to be capable to drag.
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("componentType") as
      | "image"
      | "text";
    onDropComponent(type); // Add to preview
  };

  return (
    <div
      className="preview-content"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {components.map((component) => {
        const { id, type, style, src, text } = component;

        return (
          <div
            key={id}
            style={style}
            onClick={() => onSelectComponent(component)}
            className="preview-components"
          >
            {type === "text" ? (
              <div dangerouslySetInnerHTML={{ __html: text || "" }} />
            ) : (
              <img
                src={src || DEFAULT_IMAGE_URL}
                alt="Image Component"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_IMAGE_URL;
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
