import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Theme() {
  const [selectedColor, setSelectedColor] = useState(null);
  const themes = ["#F15F5F", "#FFA7A7", "#FFD8D8", "#F29661", "#FAED7D", "#BCE55C", "#5CD1E5", "#B2EBF4", "#6699FF", "#D9E5FF", "#A366FF", "#D1B2FF"];
  const navigate = useNavigate();

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleMoveDrawing = (e) => {
    console.log("이동");
    navigate("/drawing");
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center">
      <div className=" justify-between p-4 mt-10">
        <div className="theme-content text-white text-center mb-10">
          <span className="text-4xl font-bold">Emotion Color</span>
        </div>
        <div className="emotion-palette grid grid-cols-3 gap-10 mt-20" onClick={handleMoveDrawing}>
          {themes.map((theme, index) => (
            <div key={index} className="">
              <button className="w-16 h-16 rounded-full mb-2 cursor-pointer hover:ring-2 hover:ring-white" style={{ backgroundColor: theme }} onClick={() => handleColorSelect(theme.color)}></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Theme;
