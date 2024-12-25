import { useState, useRef, useEffect } from "react";
import "./MonthSelectModal.css";

const MonthSelectModal = ({ isOpen, onClose, setCurrentDate, year, month }) => {
  const modalBackground = useRef();
  // 확인 누르기 전 임시 저장용 상태
  const [tempYear, setTempYear] = useState(year);
  const [tempMonth, setTempMonth] = useState(month);

  // 스크롤 위치를 저장할 refs
  const yearScroll = useRef(null);
  const monthScroll = useRef(null);

  // 년도 리스트 생성 (현재 년도 기준 과거 2년 ~ 미래 3년)
  const yearList = Array.from({ length: 6 }, (_, i) => year - 2 + i);
  // 월 리스트 생성 (1~12월)
  const monthList = Array.from({ length: 12 }, (_, i) => i);

  useEffect(() => {
    // 초기 스크롤 위치 설정
    if (yearScroll.current && monthScroll.current) {
      // 현재 년도가 중앙에 오도록 스크롤
      yearScroll.current.scrollTo({
        top: 56 * yearList.indexOf(tempYear) - (168 - 56) / 2,
        behavior: "smooth",
      });

      // 현재 월이 중앙에 오도록 스크롤
      monthScroll.current.scrollTo({
        top: 56 * tempMonth - (168 - 56) / 2,
        behavior: "smooth",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === modalBackground.current) {
      onClose();
    }
  };

  // 확인 버튼 클릭 시 실행
  const handleConfirm = () => {
    setCurrentDate(new Date(tempYear, tempMonth));
    onClose();
  };

  return (
    <div ref={modalBackground} className="fixed inset-0 bg-black/50" onClick={handleBackgroundClick}>
      <div className="fixed bottom-0 w-full max-w-[600px] mx-auto left-0 right-0 bg-zinc-900 rounded-t-3xl px-5 pb-8 pt-4">
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg font-medium text-white">날짜 변경</span>
          <button onClick={() => onClose()} className="text-2xl text-white">
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8 relative">
          {/* 년 선택 */}
          <div ref={yearScroll} className="h-[168px] overflow-y-auto scrollbar-hide">
            <div className="py-[56px]">
              {yearList.map((y) => (
                <div
                  key={y}
                  className={`h-[56px] py-3 rounded-lg text-center text-lg transition-colors text-white
            ${tempYear === y ? "bg-zinc-800" : "text-zinc-500"}`}
                  onClick={() => setTempYear(y)}
                >
                  {y}년
                </div>
              ))}
            </div>
          </div>

          {/* 월 선택 */}
          <div ref={monthScroll} className="h-[168px] overflow-y-auto scrollbar-hide">
            <div className="py-[56px]">
              {monthList.map((m) => (
                <div
                  key={m}
                  className={`h-[56px] py-3 rounded-lg text-center text-lg transition-colors text-white
            ${tempMonth === m ? "bg-zinc-800" : "text-zinc-500"}`}
                  onClick={() => setTempMonth(m)}
                >
                  {m + 1}월
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-white text-black rounded-xl text-lg font-medium" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default MonthSelectModal;
