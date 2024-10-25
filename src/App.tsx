import "./styles/app.css";
import React, { useState } from "react";
import ComponentLibrary from "./components/ComponentLibrary";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { DEFAULT_TEXT, DEFAULT_IMAGE_URL } from "./constants";

type ComponentType = "text" | "image";

interface ComponentData {
  id: number;
  type: ComponentType;
  style: React.CSSProperties;
  src?: string;
  text?: string;
}

const App: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);
  const [components, setComponents] = useState<ComponentData[]>([]);

  // Add new component to the list
  const addComponent = (type: ComponentType) => {
    const newComponent: ComponentData = {
      id: components.length,
      type,
      style:
        type === "image"
          ? { width: "200px", height: "200px" }
          : {
              width: "100%",
              minHeight: "25px",
            },
      src: type === "image" ? DEFAULT_IMAGE_URL : undefined,
      text: type === "text" ? DEFAULT_TEXT : undefined,
    };
    // Copy original list and add a new component in the last.
    setComponents([...components, newComponent]);
  };

  // Update attribute
  const updateStyle = (id: number, newStyle: React.CSSProperties) => {
    const updatedComponents = components.map((comp) =>
      comp.id === id ? { ...comp, style: newStyle } : comp
    );
    setComponents(updatedComponents);
  };

  // Update img src
  const updateSrc = (id: number, newSrc: string) => {
    const updatedComponents = components.map((comp) =>
      comp.id === id ? { ...comp, src: newSrc } : comp
    );
    setComponents(updatedComponents);
  };

  // Update text
  const updateText = (id: number, newText: string) => {
    const updatedComponents = components.map((comp) =>
      comp.id === id ? { ...comp, text: newText } : comp
    );
    setComponents(updatedComponents);
  };

  return (
    <div className="app">
      <div className="left-panel">
        {/* Always display ComponentLibrary */}
        <ComponentLibrary />

        {/* Display Editor when a component is selected*/}
        {selectedComponent && (
          <Editor
            component={selectedComponent}
            updateStyle={updateStyle}
            updateSrc={updateSrc}
            updateText={updateText}
          />
        )}
      </div>

      <div className="right-panel">
        <Preview
          components={components}
          onDropComponent={addComponent}
          onSelectComponent={setSelectedComponent} // Click to Select
        />
      </div>
    </div>
  );
};

export default App;
