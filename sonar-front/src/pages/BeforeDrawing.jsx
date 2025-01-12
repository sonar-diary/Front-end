// BeforeDrawing.jsx
import React, { useEffect } from "react";
import { X, ChevronLeft, Palette } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../store/drawingStore";

const BeforeDrawing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("[BeforeDrawing] location state:", location.state);
  
  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);
  const drawingImage = useStore((state) => state.drawingImage);
  const diaryText = useStore((state) => state.diaryText);
  const setDiaryText = useStore((state) => state.setDiaryText);
  const saveDiary = useStore((state) => state.saveDiary);

  useEffect(() => {
    const dateFromLocation = location.state?.date;
    console.log("[BeforeDrawing] location date:", dateFromLocation);
    console.log("[BeforeDrawing] store date:", selectedDate);
    
    // location에 날짜가 있으면 store에도 저장
    if (dateFromLocation && !selectedDate) {
      console.log("[BeforeDrawing] store에 날짜 저장:", dateFromLocation);
      setSelectedDate(dateFromLocation);
    }
    
    // 둘 다 없으면 홈으로
    if (!dateFromLocation && !selectedDate) {
      console.error("[BeforeDrawing] 날짜 없음");
      alert("날짜 정보가 없습니다.");
      navigate("/home");
      return;
    }
  }, [selectedDate, location.state, navigate, setSelectedDate]);

  const handleSave = () => {
    const dateToUse = selectedDate || location.state?.date;
    console.log("[BeforeDrawing] 저장 시도, date:", dateToUse);
    
    if (!dateToUse) {
      console.error("[BeforeDrawing] 저장 실패: 날짜 없음");
      alert("날짜 정보가 없어 저장할 수 없습니다.");
      return;
    }

    const success = saveDiary(dateToUse);
    if (success) {
      navigate("/detail", {
        state: {
          date: dateToUse,
        },
      });
    } else {
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleBack = () => {
    const dateToUse = selectedDate || location.state?.date;
    navigate("/background-color", {
      state: { date: dateToUse }
    });
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4">
        <ChevronLeft
          className="w-6 h-6"
          onClick={handleBack}
        />
        <X className="w-6 h-6" onClick={() => navigate("/home")} />
      </header>

      <main className="px-4 flex-1 flex flex-col">
        <h2 className="text-lg mb-6">특별한 순간을 담아요</h2>

        <div
          className="border border-gray-700 rounded-lg bg-gray-900 p-8 mb-4 flex items-center justify-center cursor-pointer flex-1"
          onClick={() => {
            const dateToUse = selectedDate || location.state?.date;
            navigate("/drawing", {
              state: {
                continueDrawing: !!drawingImage,
                date: dateToUse
              }
            });
          }}
        >
          {drawingImage ? (
            <img
              src={drawingImage}
              alt="Saved Drawing"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Palette className="w-12 h-12 text-gray-600" />
          )}
        </div>

        <input
          type="text"
          placeholder="오늘의 이야기를 작성해보세요"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm mb-4"
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
        />

        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-purple-600 text-white rounded-lg py-3">
            그림 보정하기
          </button>
          <button
            className="flex-1 bg-white text-black rounded-lg py-3"
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default BeforeDrawing;