import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import useStore from "../store/drawingStore";

function BackgroundColor() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);
  const selectedColor = useStore((state) => state.selectedColor);
  const setEmotionLabel = useStore((state) => state.setEmotionLabel);
  const setSelectedColor = useStore((state) => state.setSelectedColor);
  const setDrawingImage = useStore((state) => state.setDrawingImage);
  const setDiaryText = useStore((state) => state.setDiaryText);

  // 컴포넌트 마운트될 때 날짜 확인
  useEffect(() => {
    const dateFromLocation = location.state?.date;
    console.log("[BackgroundColor] location date:", dateFromLocation);
    console.log("[BackgroundColor] store date:", selectedDate);
    
    // location에 날짜가 있으면 store에도 저장
    if (dateFromLocation && !selectedDate) {
      console.log("[BackgroundColor] store에 날짜 저장:", dateFromLocation);
      setSelectedDate(dateFromLocation);
    }
    
    // 둘 다 없으면 홈으로
    if (!dateFromLocation && !selectedDate) {
      console.error("[BackgroundColor] 날짜 없음");
      alert("날짜 정보가 없습니다.");
      navigate("/home");
    }
  }, []);

  // 폼 초기화
  useEffect(() => {
    setDrawingImage(null);
    setDiaryText("");
    setSelectedColor(null);
    setEmotionLabel("");
  }, []);

  const themes = [
    { color: "#F15F5F", label: "무난" },
    { color: "#FFA7A7", label: "슬픔" },
    { color: "#FFD8D8", label: "답답" },
    { color: "#F29661", label: "서운" },
    { color: "#FAED7D", label: "착잡" },
    { color: "#BCE55C", label: "무섭" },
    { color: "#5CD1E5", label: "실망" },
    { color: "#B2EBF4", label: "화남" },
    { color: "#6699FF", label: "피곤" },
    { color: "#D9E5FF", label: "우울" },
    { color: "#A366FF", label: "답답" },
    { color: "#D1B2FF", label: "공허" },
  ];

  const handleColorSelect = (color, label) => {
    setSelectedColor(color);
    setEmotionLabel(label);
  };

  const handleNext = () => {
    const dateToUse = selectedDate || location.state?.date;
    console.log("[BackgroundColor] BeforeDrawing으로 이동, date:", dateToUse);

    if (!dateToUse) {
      console.error("[BackgroundColor] 다음 페이지 이동 실패: 날짜 없음");
      alert("날짜 정보가 없습니다.");
      return;
    }

    navigate("/before-drawing", {
      state: {
        selectedColor,
        date: dateToUse
      }
    });
  };

  return (
    <div className="h-screen bg-black">
      <header className="flex items-center justify-end p-4">
        <X className="w-6 h-6 text-white" onClick={() => navigate("/home")} />
      </header>
      
      <div className="p-4 mt-3">
        <div className="text-white text-center mb-10">
          <h1 className="text-3xl font-bold">Emotion Color</h1>
          <p className="text-sm text-gray-400">오늘의 색을 선택하세요</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-7">
          {themes.map(({ color, label }, index) => (
            <div key={index} className="text-center">
              <button
                className={`w-16 h-16 rounded-full ${
                  selectedColor === color ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color, label)}
              />
              <p className="text-white text-sm mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedColor && (
        <div
          className="absolute inset-0 bg-black/50 flex items-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedColor(null);
              setEmotionLabel("");
            }
          }}
        >
          <div className="w-full p-4">
            <button
              className="w-full py-4 bg-[#7969F4] text-white rounded-lg"
              onClick={handleNext}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackgroundColor;