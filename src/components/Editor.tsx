import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill for rich Content
import { DEFAULT_IMAGE_URL, DEFAULT_TEXT } from "../constants";
import "../styles/Editor.css";

interface ComponentData {
  id: number;
  type: "image" | "text";
  style: React.CSSProperties;
  src?: string;
  text?: string;
}

interface EditorProps {
  component?: ComponentData | null;
  updateStyle: (id: number, newStyle: React.CSSProperties) => void;
  updateSrc: (id: number, newSrc: string) => void;
  updateText: (id: number, newText: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  component,
  updateStyle,
  updateSrc,
  updateText,
}) => {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [src, setSrc] = useState<string>(DEFAULT_IMAGE_URL); // default URL
  const [text, setText] = useState<string>(DEFAULT_TEXT);

  useEffect(() => {
    if (component) {
      setWidth(component.style.width as string);
      setHeight(component.style.height as string);

      if (component.type === "image" && component.src) {
        setSrc(component.src);
      } else if (component.type === "text" && component.text) {
        setText(component.text);
      }
    }
  }, [component]);

  // Update Width or Height
  const handleStyleChange = (key: "width" | "height", value: string) => {
    if (key === "width") setWidth(value);
    else setHeight(value);

    if (component) {
      updateStyle(component.id, { ...component.style, [key]: value });
    }
  };

  // Update Img Src
  const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSrc = e.target.value;
    setSrc(newSrc);
    if (component && component.type === "image") {
      updateSrc(component.id, newSrc);
    }
  };

  // Update Text
  const handleTextChange = (value: string) => {
    setText(value);
    if (component && component.type !== "image") {
      updateText(component.id, value);
    }
  };

  if (!component) return <div>Please choose a Component</div>;

  return (
    <div className="editor-container">
      {component.type === "image" ? (
        <>
          <label className="editor-label">Width：</label>
          <input
            className="editor-input"
            value={width}
            onChange={(e) => handleStyleChange("width", e.target.value)}
          />

          <label className="editor-label">Height：</label>
          <input
            className="editor-input"
            value={height}
            onChange={(e) => handleStyleChange("height", e.target.value)}
          />

          <label className="editor-label">URL：</label>
          <input
            className="editor-input"
            value={src}
            onChange={handleSrcChange}
          />
        </>
      ) : (
        <>
          <label className="editor-label">New Text：</label>
          <ReactQuill value={text} onChange={handleTextChange} />
        </>
      )}
    </div>
  );
};

export default Editor;
