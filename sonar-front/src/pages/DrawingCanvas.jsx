import { useEffect, useState } from "react";

function DrawingCanvas() {
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState("#000000");
  const colors = ["#000000", "#FF0000", "#0000FF", "#00FF00", "#FFA500", "#800080"];

  useEffect(() => {
    const fabricCanvas = new window.fabric.Canvas("canvas", {
      isDrawingMode: true,
      width: 400,
      height: 600,
      backgroundColor: "white",
      borderRadius: "10px",
    });

    fabricCanvas.freeDrawingBrush.width = 2;
    fabricCanvas.freeDrawingBrush.color = color;
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);
  // 색 바꾸기
  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (canvas) {
      canvas.freeDrawingBrush.color = newColor;
    }
  };

  return (
    <div className="h-screen bg-black">
      <div className="flex justify-between p-4">
        <button className="text-white">←</button>
        <div className="flex gap-4">
          <button className="text-white">↺</button>
          <button className="text-white">↻</button>
        </div>
        <button className="text-white">×</button>
      </div>

      <div className="flex justify-center">
        <canvas id="canvas" className="rounded-lg shadow-lg" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
        <div className="flex justify-center gap-4 mb-4">
          {colors.map((c) => (
            <button key={c} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: c }} onClick={() => handleColorChange(c)} />
          ))}
        </div>
        <button className="w-full py-3 bg-white rounded-full text-black">완료</button>
      </div>
    </div>
  );
}

export default DrawingCanvas;
