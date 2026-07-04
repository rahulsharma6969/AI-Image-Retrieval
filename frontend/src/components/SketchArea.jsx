import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { Pencil, Square, Circle, Triangle, Eraser } from "lucide-react";

function Button({ variant, children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded ${variant === "outline" ? "border border-gray-500" : "bg-blue-500 text-white"}`}
      {...props}
    >
      {children}
    </button>
  );
}

const SketchArea = () => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.2);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.25);


  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  return (
    <div className="p-4 w-full h-80 border-2 border-dashed border-gray-300 rounded-lg flex">
      <div className="flex flex-col gap-4 mr-4">
        <button
          onClick={() => setTool("pencil")}
          className={`p-2 rounded ${tool === "pencil" ? "bg-gray-700" : ""}`}
        >
          <Pencil />
        </button>
        <button
          onClick={() => setTool("rectangle")}
          className={`p-2 rounded ${tool === "rectangle" ? "bg-gray-700" : ""}`}
        >
          <Square />
        </button>
        <button
          onClick={() => setTool("circle")}
          className={`p-2 rounded ${tool === "circle" ? "bg-gray-700" : ""}`}
        >
          <Circle />
        </button>
        <button
          onClick={() => setTool("triangle")}
          className={`p-2 rounded ${tool === "triangle" ? "bg-gray-700" : ""}`}
        >
          <Triangle />
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`p-2 rounded ${tool === "eraser" ? "bg-gray-700" : ""}`}
        >
          <Eraser />
        </button>
      </div>

      <div className="flex flex-col w-full h-full">
        <div className="flex-grow flex items-center justify-center">
          <CanvasDraw
            ref={canvasRef}
            brushColor={tool === "eraser" ? "#FFFFFF" : "#000"}
            hideGrid
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            lazyRadius={0}
            enablePanAndZoom
          />
        </div>

        <div className="flex justify-start mt-4 w-full px-4">
          <Button variant="outline" onClick={clearCanvas}>
            Clear
          </Button>
          <Button variant="default" className="ml-2">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default SketchArea;

