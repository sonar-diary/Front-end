// import { useEffect, useState } from "react";

// function DrawingCanvas() {
//   const [canvas, setCanvas] = useState(null);
//   const [color, setColor] = useState("#000000");
//   const colors = ["#000000", "#FF0000", "#0000FF", "#00FF00", "#FFA500", "#800080"];

//   useEffect(() => {
//     const fabricCanvas = new window.fabric.Canvas("canvas", {
//       isDrawingMode: true,
//       width: 400,
//       height: 600,
//       backgroundColor: "white",
//       borderRadius: "10px",
//     });

//     fabricCanvas.freeDrawingBrush.width = 2;
//     fabricCanvas.freeDrawingBrush.color = color;
//     setCanvas(fabricCanvas);

//     return () => {
//       fabricCanvas.dispose();
//     };
//   }, []);
//   // 색 바꾸기
//   const handleColorChange = (newColor) => {
//     setColor(newColor);
//     if (canvas) {
//       canvas.freeDrawingBrush.color = newColor;
//     }
//   };

//   return (
//     <div className="h-screen bg-black">
//       <div className="flex justify-between p-4">
//         <button className="text-white">←</button>
//         <div className="flex gap-4">
//           <button className="text-white">↺</button>
//           <button className="text-white">↻</button>
//         </div>
//         <button className="text-white">×</button>
//       </div>

//       <div className="flex justify-center">
//         <canvas id="canvas" className="rounded-lg shadow-lg" />
//       </div>

//       {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
//         <div className="flex justify-center gap-4 mb-4">
//           {colors.map((c) => (
//             <button key={c} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: c }} onClick={() => handleColorChange(c)} />
//           ))}
//         </div>
//         <button className="w-full py-3 bg-white rounded-full text-black">완료</button>
//       </div> */}
//       <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 bg-black max-w-[600px] w-full">
//   <div className="flex justify-center gap-4 mb-4">
//     {colors.map((c) => (
//       <button key={c} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: c }} onClick={() => handleColorChange(c)} />
//     ))}
//   </div>
//   <button className="w-full py-3 bg-white rounded-full text-black">완료</button>
// </div>
//     </div>
//   );
// }

// export default DrawingCanvas;
import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";

function DrawingCanvas() {
  const [canvas, setCanvas] = useState(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [brushType, setBrushType] = useState("basic");
  const [showColorPicker, setShowColorPicker] = useState(false);

  let _config = {
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: 1,
    redoFinishedStatus: 1,
  };

  // 브러시 종류 정의
  const brushTypes = [
    { id: "basic", name: "기본 브러시" },
    { id: "smooth", name: "부드러운 브러시" },
    { id: "pen", name: "펜" },
    { id: "spray", name: "스프레이" },
    { id: "calligraphy", name: "캘리그라피" },
    { id: "marker", name: "마커" },
  ];

  useEffect(() => {
    const fabricCanvas = new window.fabric.Canvas("canvas", {
      isDrawingMode: true,
      width: 400,
      height: 600,
      backgroundColor: "white",
      borderRadius: "10px",
    });

    // 초기 브러시 설정
    fabricCanvas.freeDrawingBrush = new window.fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = brushSize;
    fabricCanvas.freeDrawingBrush.color = color;
    setCanvas(fabricCanvas);

    // 실행 취소/다시 실행을 위한 상태 저장
    fabricCanvas.on("object:added", function () {
      if (_config.undoStatus == false && _config.redoStatus == false) {
        _config.canvasState.push(JSON.stringify(fabricCanvas));
        _config.currentStateIndex += 1;
      }
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    if (canvas) {
      canvas.freeDrawingBrush.color = newColor.hex;
    }
  };

  const changeBrushType = (type) => {
    if (!canvas) return;

    let brush;
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
    canvas.freeDrawingBrush = brush;
    setBrushType(type);
  };

  const handleBrushSize = (size) => {
    setBrushSize(size);
    if (canvas) {
      changeBrushType(brushType); // 현재 브러시 타입 유지하면서 크기만 변경
    }
  };

  // 실행 취소/다시 실행 기능
  const undo = () => {
    if (canvas && _config.currentStateIndex > 0) {
      _config.undoStatus = true;
      _config.currentStateIndex -= 1;
      canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex], function () {
        canvas.renderAll();
        _config.undoStatus = false;
      });
    }
  };

  const redo = () => {
    if (canvas && _config.currentStateIndex < _config.canvasState.length - 1) {
      _config.redoStatus = true;
      _config.currentStateIndex += 1;
      canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex], function () {
        canvas.renderAll();
        _config.redoStatus = false;
      });
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex justify-between p-4">
        <button className="text-white">←</button>
        <div className="flex gap-4">
          <button className="text-white" onClick={undo}>
            ↺
          </button>
          <button className="text-white" onClick={redo}>
            ↻
          </button>
        </div>
        <button className="text-white">×</button>
      </div>

      <div className="flex-1 flex justify-center items-center px-4">
        <canvas id="canvas" className="rounded-lg shadow-lg" />
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-3 bg-black max-w-[600px] w-full bg-opacity-90">
        {/* 브러시 선택 */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
          {brushTypes.map((brush) => (
            <button
              key={brush.id}
              className={`flex-shrink-0 px-3 py-1 rounded-full ${brushType === brush.id ? "bg-white text-black" : "text-white border border-white"}`}
              onClick={() => changeBrushType(brush.id)}
            >
              {brush.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          {/* 브러시 크기 */}
          <div className="flex gap-2">
            {[2, 5, 10].map((size) => (
              <button
                key={size}
                className={`rounded-full border-2 
                 ${brushSize === size ? "bg-white" : "border-white"}
                 ${size === 2 ? "w-6 h-6" : size === 5 ? "w-8 h-8" : "w-10 h-10"}`}
                onClick={() => handleBrushSize(size)}
              />
            ))}
          </div>

          {/* 색상 선택 */}
          <div className="relative">
            <button className="w-10 h-10 rounded-full border-2 border-white" style={{ backgroundColor: color }} onClick={() => setShowColorPicker(!showColorPicker)} />
            {showColorPicker && (
              <div className="absolute bottom-full right-0 mb-2">
                <ChromePicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>

        <button className="w-full py-2.5 bg-white rounded-full text-black">완료</button>
      </div>
    </div>
  );
}

export default DrawingCanvas;
