import React, { useState } from "react";

const DalleTheme = ({ onSelect, onConfirm }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const themes = [
    { id: 1, name: "수채화", style: "watercolor painting style" },
    { id: 2, name: "애니메이션", style: "anime style, Studio Ghibli" },
    { id: 3, name: "팝아트", style: "pop art style" },
    { id: 4, name: "드로잉", style: "professional sketch style" },
    { id: 5, name: "동화", style: "children's book illustration" },
    { id: 6, name: "픽셀", style: "pixel art style" },
    { id: 7, name: "만화", style: "manhwa style" },
    { id: 8, name: "미니멀", style: "minimal line art" },
    { id: 9, name: "3D", style: "3D rendered illustration" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] px-4 py-6">
      <div className="flex flex-col h-full">
        <div className="text-white mb-4">
          <h2 className="text-xl font-medium mb-2 mt-5">어떻게 표현하고 싶나요?</h2>
          <p className="text-sm text-gray-400">원하는 테마를 선택하면 그림을 그려요</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-8">
          {themes.map((theme) => (
            <button key={theme.id} className={`aspect-square rounded-xl overflow-hidden ${selectedTheme === theme.id ? "ring-2 ring-purple-500" : ""}`} onClick={() => setSelectedTheme(theme.id)}>
              <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center">
                <span className="text-white text-sm">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          className={` mt-10 w-full py-3 rounded-full font-medium ${selectedTheme ? "bg-purple-600 text-white" : "bg-[#2A2A2A] text-gray-400"}`}
          onClick={() => selectedTheme && onConfirm(selectedTheme)}
        >
          선택완료
        </button>
      </div>
    </div>
  );
};

export default DalleTheme;
