import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../store/drawingStore";

function DrawingCanvas() {
  const drawingImage = useStore((state) => state.drawingImage);
  const setDrawingImage = useStore((state) => state.setDrawingImage);
  const navigate = useNavigate();
  const location = useLocation();
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [brushType, setBrushType] = useState("basic");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBrushPicker, setShowBrushPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  const [config, setConfig] = useState({
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
  });

  const brushSizes = [2, 4, 6, 8, 10, 12];

  const brushTypes = [
    { id: "basic", name: "기본 브러시", icon: "✏️" },
    { id: "smooth", name: "부드러운 브러시", icon: "🖌️" },
    { id: "pen", name: "펜", icon: "✒️" },
    { id: "spray", name: "스프레이", icon: "💨" },
    { id: "calligraphy", name: "캘리그라피", icon: "🖋️" },
    { id: "marker", name: "마커", icon: "🖍️" },
  ];

  const getBrushIcon = (type) => {
    const brush = brushTypes.find((b) => b.id === type);
    return brush ? brush.icon : "✏️";
  };

  useEffect(() => {
    const fabricCanvas = new window.fabric.Canvas("canvas", {
      isDrawingMode: true,
      width: 368,
      height: window.innerHeight - 230,
      backgroundColor: "white",
      borderRadius: "16px",
    });

    if (drawingImage && location.state?.continueDrawing) {
      fabric.Image.fromURL(drawingImage, function (img) {
        fabricCanvas.add(img);
        fabricCanvas.renderAll();
      });
    }

    fabricCanvas.freeDrawingBrush = new window.fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = brushSize;
    fabricCanvas.freeDrawingBrush.color = color;
    setCanvas(fabricCanvas);

    const initialState = JSON.stringify(fabricCanvas);
    setConfig((prev) => ({
      ...prev,
      canvasState: [initialState],
      currentStateIndex: 0,
    }));

    fabricCanvas.on("mouse:up", function () {
      if (!config.undoStatus && !config.redoStatus) {
        const currentState = JSON.stringify(fabricCanvas);
        setConfig((prev) => ({
          ...prev,
          canvasState: [...prev.canvasState.slice(0, prev.currentStateIndex + 1), currentState],
          currentStateIndex: prev.currentStateIndex + 1,
        }));
      }
    });

    return () => fabricCanvas.dispose();
  }, [location.state, drawingImage, brushSize, color]);

  useEffect(() => {
    if (canvas) {
      changeBrushType(brushType);
    }
  }, [brushSize, color, brushType, canvas]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const changeBrushType = (type) => {
    if (!canvas) return;
    let brush;

    if (type === "eraser") {
      brush = new window.fabric.PencilBrush(canvas);
      brush.width = brushSize * 2;
      brush.color = "#FFFFFF";
      brush.strokeLineCap = "round";
      brush.strokeLineJoin = "round";
    } else {
      switch (type) {
        case "basic":
          brush = new window.fabric.PencilBrush(canvas);
          brush.width = brushSize;
          break;

        case "smooth":
          brush = new window.fabric.PencilBrush(canvas);
          brush.strokeLineCap = "round";
          brush.strokeLineJoin = "round";
          brush.width = brushSize * 1.5;
          brush.shadow = new window.fabric.Shadow({
            blur: brushSize,
            offsetX: 0,
            offsetY: 0,
            color: color,
          });
          break;

        case "pen":
          brush = new window.fabric.PencilBrush(canvas);
          brush.strokeLineCap = "square";
          brush.width = brushSize * 0.5;
          brush.pressure = true;
          break;

        case "spray":
          brush = new window.fabric.SprayBrush(canvas);
          brush.width = brushSize * 10;
          brush.density = 50;
          brush.dotWidth = brushSize * 0.5;
          brush.randomOpacity = true;
          break;

        case "calligraphy":
          brush = new window.fabric.PencilBrush(canvas);
          brush.strokeLineCap = "round";
          brush.strokeLineJoin = "round";
          brush.width = brushSize * 2;
          brush.angle = 45;
          brush.pressure = true;
          break;

        case "marker":
          brush = new window.fabric.PencilBrush(canvas);
          brush.strokeLineCap = "square";
          brush.width = brushSize * 3;
          brush.opacity = 0.5;
          brush.shadow = new window.fabric.Shadow({
            blur: 0,
            offsetX: brushSize / 2,
            offsetY: brushSize / 2,
            color: color,
          });
          break;

        default:
          brush = new window.fabric.PencilBrush(canvas);
          brush.width = brushSize;
      }
      brush.color = color;
    }

    canvas.freeDrawingBrush = brush;
    setBrushType(type);
  };

  const handleBrushSize = (size) => {
    setBrushSize(size);
    setShowSizePicker(false);
  };

  const handleComplete = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      setDrawingImage(dataURL);
      navigate("/before-drawing");
    }
  };

  const undo = () => {
    if (canvas && config.currentStateIndex > 0) {
      setConfig((prev) => ({
        ...prev,
        undoStatus: true,
        currentStateIndex: prev.currentStateIndex - 1,
      }));
      canvas.loadFromJSON(config.canvasState[config.currentStateIndex - 1], () => {
        canvas.renderAll();
        setConfig((prev) => ({
          ...prev,
          undoStatus: false,
        }));
      });
    }
  };

  const redo = () => {
    if (canvas && config.currentStateIndex < config.canvasState.length - 1) {
      setConfig((prev) => ({
        ...prev,
        redoStatus: true,
        currentStateIndex: prev.currentStateIndex + 1,
      }));
      canvas.loadFromJSON(config.canvasState[config.currentStateIndex + 1], () => {
        canvas.renderAll();
        setConfig((prev) => ({
          ...prev,
          redoStatus: false,
        }));
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[#1A1A1A]">
      {/* 상단 네비게이션 */}
      <div className="bg-[#2A2A2A] h-14 px-4 flex items-center justify-between">
        <button className="text-white text-xl" onClick={() => navigate("/before-drawing")}>
          ←
        </button>
        <div className="flex gap-6">
          <button onClick={undo} className="text-white text-xl">
            ↺
          </button>
          <button onClick={redo} className="text-white text-xl">
            ↻
          </button>
        </div>
        <button className="text-white text-xl">×</button>
      </div>

      {/* 캔버스 영역 */}
      <div className="flex justify-center items-start p-4">
        <canvas id="canvas" className="rounded-2xl shadow-lg" />
      </div>

      {/* 하단 도구 영역 */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[400px] mx-auto">
        <div className="bg-[#2A2A2A] px-4 pt-4">
          {/* 브러시 선택 바 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {/* 브러시 선택 */}
              <div className="relative">
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg
                  ${brushType !== "eraser" ? "bg-white text-black" : "border border-white text-white"}`}
                  onClick={() => setShowBrushPicker((prev) => !prev)}
                >
                  {getBrushIcon(brushType)}
                </button>
                {showBrushPicker && (
                  <div className="absolute bottom-full left-0 mb-2 bg-[#2A2A2A] rounded-lg p-2 flex gap-2 z-50">
                    {brushTypes.map((brush) => (
                      <button
                        key={brush.id}
                        className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${brushType === brush.id ? "bg-white text-black" : "border border-white text-white"}`}
                        onClick={() => {
                          changeBrushType(brush.id);
                          setShowBrushPicker(false);
                        }}
                      >
                        {brush.icon}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 지우개 */}
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg
                ${brushType === "eraser" ? "bg-white text-black" : "border border-white text-white"}`}
                onClick={() => changeBrushType("eraser")}
              >
                🧹
              </button>
            </div>

            {/* 브러시 크기 선택 */}
            <div className="relative">
              <button className={`w-12 h-12 rounded-full flex items-center justify-center border border-white text-white`} onClick={() => setShowSizePicker((prev) => !prev)}>
                <div
                  className="rounded-full bg-white"
                  style={{
                    width: `${brushSize * 2}px`,
                    height: `${brushSize * 2}px`,
                  }}
                />
              </button>

              {showSizePicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-[#2A2A2A] rounded-lg p-2 flex gap-2 z-50">
                  {brushSizes.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${brushSize === size ? "bg-white" : "border border-white"}`}
                      onClick={() => handleBrushSize(size)}
                    >
                      <div
                        className={`rounded-full ${brushSize === size ? "bg-black" : "bg-white"}`}
                        style={{
                          width: `${size * 2}px`,
                          height: `${size * 2}px`,
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button className="w-7 h-7 rounded-full border-2 border-white" style={{ backgroundColor: color }} onClick={() => setShowColorPicker(!showColorPicker)} />
              {showColorPicker && (
                <div className="absolute bottom-full right-0 mb-2 z-50">
                  <ChromePicker color={color} onChange={handleColorChange} />
                </div>
              )}
            </div>
          </div>

          {/* 완료 버튼 */}
          <div className="px-4 pb-4">
            <button className="w-full py-3 bg-white text-black rounded-full font-medium" onClick={handleComplete}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawingCanvas;
