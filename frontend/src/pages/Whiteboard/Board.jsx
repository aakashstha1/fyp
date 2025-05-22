import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import axios from "axios";
import { Eraser, Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = ["black", "red", "blue", "green", "yellow"];

const Board = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [penColor, setPenColor] = useState("black");
  const [eraserSize, setEraserSize] = useState(20);

  const getOffsetCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getOffsetCoords(e);
    const ctx = canvasRef.current.getContext("2d");

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || (tool !== "pen" && tool !== "eraser")) return;

    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getOffsetCoords(e);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = tool === "eraser" ? eraserSize : 3;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : penColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const uploadImage = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "drawing.png");

      try {
        const res = await axios.post(
          "http://localhost:8000/api/draw/create",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success(res.data?.message || "Upload successful");
      } catch (error) {
        console.log(error);
        toast.error("Upload failed");
      }
    }, "image/png");
  };

  return (
    <Card className="max-w-7xl mx-auto my-6">
      <CardHeader>
        <CardTitle>Interactive Whiteboard</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-4 ">
            <Toggle
              pressed={tool === "pen"}
              onPressedChange={() => setTool("pen")}
            >
              <Pen size={20} />
            </Toggle>
            <Toggle
              pressed={tool === "eraser"}
              onPressedChange={() => setTool("eraser")}
            >
              <Eraser size={20} />
            </Toggle>
            <Button variant="ghost" onClick={clearCanvas}>
              <Trash2 />
            </Button>

            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setPenColor(color)}
                  className={`h-6 w-6 rounded-full border-2 outline-2 ${
                    penColor === color
                      ? "border-white outline-black"
                      : "border-transparent outline-none"
                  }`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
            {tool === "eraser" && (
              <div className="flex items-center gap-2">
                <label htmlFor="eraserSize" className="text-sm">
                  Size
                </label>
                <input
                  id="eraserSize"
                  type="range"
                  min={5}
                  max={50}
                  value={eraserSize}
                  onChange={(e) => setEraserSize(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button onClick={uploadImage}>Upload</Button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={350}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border border-gray-300 rounded-md w-full cursor-crosshair bg-white"
        />
      </CardContent>
    </Card>
  );
};

export default Board;
