import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const CanvasBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState("");

  const startDrawing = (e) => {
    if (isTextMode) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(textInput, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      return;
    }

    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing || isTextMode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = isErasing ? "#ffffff" : "black";
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
    setIsTextMode(false);
  };

  const toggleTextMode = () => {
    setIsTextMode(!isTextMode);
    setIsErasing(false);
  };
  const saveAsPNG = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "draw.png";
    link.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Canvas Drawing with Text</h2>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={toggleEraser}>
          {isErasing ? "Switch to Pen" : "Enable Eraser"}
        </button>
        <input
          type="text"
          placeholder="Enter text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={toggleTextMode} style={{ marginLeft: "10px" }}>
          {isTextMode ? "Disable Text Mode" : "Enable Text Mode"}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={700}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      />
      <Button variant="outline" onClick={saveAsPNG} className="mt-4">
        Save as PNG
      </Button>
    </div>
  );
};

export default CanvasBoard;
