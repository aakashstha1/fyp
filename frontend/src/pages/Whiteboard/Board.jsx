/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import axios from "axios";
import { Eraser, Loader2, Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = ["black", "red", "blue", "green", "yellow"];

const Board = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [penColor, setPenColor] = useState("black");
  const [eraserSize, setEraserSize] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  // Resize canvas to match its CSS size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCanvas = () => {
        const parent = canvas.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;

        // Set canvas resolution for high-DPI screens
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }
  }, []);

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
    const ctx = canvas.getContext("2d");

    // Create a temporary canvas to preserve existing content
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Fill white background
    tempCtx.fillStyle = "white";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw existing canvas content on top
    tempCtx.drawImage(canvas, 0, 0);

    // Export the temp canvas as blob with white background
    tempCanvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "drawing.png");

      try {
        setIsLoading(true);
        const res = await axios.post(
          "http://localhost:8000/api/draw/create",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success(res.data?.message || "Upload successful");
      } catch (error) {
        console.log(error);
        toast.error("Upload failed");
      } finally {
        setIsLoading(false);
      }
    }, "image/png");
  };

  return (
    <Card className="h-screen py-4 px-6 border-0">
      <CardHeader>
        <CardTitle>Interactive Whiteboard</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-4">
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
            <Button disabled={isLoading} onClick={uploadImage}>
              {isLoading ? (
                <>
                  Uploading <Loader2 className="h-5 w-5 animate-spin ml-2" />
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>

        <div className="relative w-full h-[calc(100vh-150px)] border border-gray-700 rounded-md bg-white">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={`absolute top-0 left-0 w-full h-full 
    ${
      tool === "pen"
        ? "cursor-pen"
        : tool === "eraser"
        ? "cursor-eraser"
        : "cursor-crosshair"
    }
  `}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Board;
