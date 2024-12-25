import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import MonthSelectModal from "./MonthSelectModal";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar() {
  const [monthModalOpen, setMonthModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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
              {year}년 {month + 1}월{/* <span className="text-sm sm:text-lg ml-2 sm:ml-4">▼</span> */}
            </h2>
          </div>
        </section>

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
        <section {...swipeMonth} className="touch-action-pan-y">
          <div className="grid grid-cols-7 gap-x-1 gap-y-4 sm:gap-x-2 sm:gap-y-6 text-sm sm:text-lg">
            {createCalendarDays().map((date, index) => (
              <div
                key={index}
                className={`text-center p-1 sm:p-2 aspect-square rounded-[35%] flex flex-col
                ${!date ? "text-gray-600" : "hover:bg-gray-800 cursor-pointer rounded-lg"}`}
              >
                {/* 그림 공간 */}
                <div className="w-full aspect-square rounded-[35%] bg-zinc-700 mb-0.5 sm:mb-1">{/* 여기에 나중에 이미지가 들어갈 예정 */}</div>
                {/* 날짜 */}
                <div className="text-center">{date}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* month 이동 모달 */}
      <MonthSelectModal isOpen={monthModalOpen} onClose={() => setMonthModalOpen(false)} currentDate={currentDate} setCurrentDate={setCurrentDate} year={year} month={month} />
    </>
  );
}

export default Calendar;
