import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Lock, Mail, Plus } from "lucide-react";
import MonthSelectModal from "./MonthSelectModal";
import DearMeAlert from "./DearMeAlert";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 임시 편지 데이터
const TEMP_LETTERS = [
  {
    id: "1",
    content: "내용 1",
    openDate: new Date(2024, 11, 25), // 24년 12월 25일
  },
  {
    id: "2",
    content: "내용 2",
    openDate: new Date(2024, 11, 31), // 24년 12월 31일
  },
];

function Calendar({ activeTab, setActiveTab }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showFutureLetterModal, setShowFutureLetterModal] = useState(false);
  const [monthModalOpen, setMonthModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();
  const TODAY_YEAR = today.getFullYear();
  const TODAY_MONTH = today.getMonth();
  const TODAY_DATE = today.getDate();

  // 현재 날짜인지 체크
  const isCurrentDay = (date) => date === TODAY_DATE && month === TODAY_MONTH && year === TODAY_YEAR;

  // 날짜 비교 함수
  const isFutureDate = (date) => {
    if (!date) return false;
    const calendarDate = new Date(year, month, date);
    const todayDate = new Date(TODAY_YEAR, TODAY_MONTH, TODAY_DATE);
    return calendarDate > todayDate;
  };

  // 해당 날짜에 편지가 있는지 확인
  const getLetterForDate = (date) => {
    if (!date) return null;
    return TEMP_LETTERS.find((letter) => {
      const letterDate = letter.openDate;
      return letterDate.getDate() === date && letterDate.getMonth() === month && letterDate.getFullYear() === year;
    });
  };

  // 편지 삭제 핸들러
  const handleDeleteLetter = (letterId) => {
    // 실제 삭제 로직 구현 필요
    console.log(`편지 ${letterId} 삭제됨`);
  };

  // 달력에 표시될 날짜들
  const createCalendarDays = () => {
    // 해당 월의 첫째 날 (객체)
    const firstDay = new Date(year, month, 1);
    // 그 첫째 날의 요일 (0: 일요일 ~ 6: 토요일)
    const firstDayOfWeek = firstDay.getDay();
    // 해당 월의 마지막 날짜
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];

    // 1. 첫째 날 이전의 칸을 전 월의 날짜로 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    // 2. 1일부터 마지막 날까지 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    return days;
  };

  // 달 이동하는 스와이프 핸들러
  const swipeMonth = useSwipeable({
    // 이전 달
    onSwipedRight: () => {
      setCurrentDate(new Date(year, month - 1));
      console.log("이전 달로 이동");
    },
    // 다음 달
    onSwipedLeft: () => {
      setCurrentDate(new Date(year, month + 1));
      console.log("다음 달로 이동");
    },
    swipeDuration: 500, // 스와이프 감지 시간
    preventScrollOnSwipe: true, // 스와이프 중 스크롤 방지
    trackMouse: true, // 마우스로도 스와이프 가능하게
  });

  // 날짜 셀 렌더링
  const renderDateCell = (date, index) => {
    if (!date) {
      return <div key={index} className="text-gray-600" />;
    }

    const hasLetter = getLetterForDate(date);
    const isToday = isCurrentDay(date);
    const isFuture = isFutureDate(date);

    if (activeTab === "diary") {
      return (
        <div
          key={index}
          className={`text-center p-0.5 aspect-square rounded-[35%] flex flex-col
            ${isFuture ? "text-gray-600 cursor-not-allowed" : "hover:bg-gray-800 cursor-pointer rounded-lg"}`}
        >
          <div className={`w-full aspect-square rounded-[35%] relative ${isToday ? "bg-gradient-to-r from-[#7969f4] to-[#822fd5]" : isFuture ? "bg-zinc-900" : "bg-zinc-700"} mb-0.5`}>
            {isToday && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="text-center text-xs">{date}</div>
        </div>
      );
    } else {
      // 편지 탭
      const handleCellClick = () => {
        if (hasLetter && isFuture) {
          setSelectedLetter(getLetterForDate(date));
          setShowFutureLetterModal(true);
        }
      };

      return (
        <div
          key={index}
          onClick={handleCellClick}
          className={`text-center p-0.5 aspect-square rounded-[35%] flex flex-col
          ${hasLetter ? "cursor-pointer" : "text-gray-600"}`}
        >
          <div className={`w-full aspect-square rounded-[35%] relative ${hasLetter ? (isFuture ? "bg-zinc-700" : "bg-gradient-to-r from-[#7969f4] to-[#822fd5]") : "bg-zinc-900"} mb-0.5`}>
            {hasLetter && <div className="absolute inset-0 flex items-center justify-center">{isFuture ? <Lock className="w-3 h-3 text-white" /> : <Mail className="w-3 h-3 text-white" />}</div>}
          </div>
          <div className="text-center text-xs">{date}</div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 mt-6 bg-black text-white">
        {/* 년/월 */}
        <section>
          <div className="flex justify-between items-center mb-4 sm:mb-8">
            <h2
              className="flex items-center text-2xl sm:text-3xl font-bold cursor-pointer"
              onClick={() => {
                setMonthModalOpen(true);
                console.log("모달 열림 :", true);
              }}
            >
              {year}년 {month + 1}월
            </h2>
          </div>
        </section>

        {/* 탭 네비게이션 */}
        <div className="flex border-b border-zinc-700 mb-8 mt-">
          <button
            onClick={() => setActiveTab("diary")}
            className={`flex-1 py-2 px-4 font-medium text-sm sm:text-base transition-colors
              ${activeTab === "diary" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-gray-300"}`}
          >
            그림일기
          </button>
          <button
            onClick={() => setActiveTab("letter")}
            className={`flex-1 py-2 px-4 font-medium text-sm sm:text-base transition-colors
              ${activeTab === "letter" ? "text-white border-b-2 border-white" : "text-gray-400 hover:text-gray-300"}`}
          >
            나에게 쓰는 편지
          </button>
        </div>

        {/* 요일 */}
        <section>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {DAYS.map((weekday, index) => (
              <div key={weekday} className={`text-center font-bold text-sm sm:text-lg ${index === 0 ? "text-red-500" : ""}`}>
                {weekday}
              </div>
            ))}
          </div>
        </section>

        {/* 날짜 */}
        <section {...swipeMonth} className="touch-action-pan-y sm:mb-80">
          <div className="grid grid-cols-7 gap-x-1 gap-y-4 sm:gap-x-2 sm:gap-y-6 text-sm sm:text-lg">{createCalendarDays().map((date, index) => renderDateCell(date, index))}</div>
        </section>

        {/* month 이동 모달 */}
        <MonthSelectModal isOpen={monthModalOpen} onClose={() => setMonthModalOpen(false)} currentDate={currentDate} setCurrentDate={setCurrentDate} year={year} month={month} />
      </div>

      {/* 나쓰편 삭제 알림 모달 */}
      <DearMeAlert isOpen={showFutureLetterModal} onClose={() => setShowFutureLetterModal(false)} letter={selectedLetter} onDelete={handleDeleteLetter} />
    </>
  );
}

export default Calendar;
