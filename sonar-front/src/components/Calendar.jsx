import { useState } from "react";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function Calendar() {
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
    // 이전 월의 마지막 날짜 구하기
    const prevLastDate = new Date(year, month, 0).getDate();

    const days = [];

    // 1. 첫째 날 이전의 칸을 전 월의 날짜로 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(prevLastDate - firstDayOfWeek + i + 1);
    }
    // 2. 1일부터 마지막 날까지 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    return days;
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 bg-black text-white">
        {/* 년/월 */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {year}년 {month + 1}월
            </h2>
          </div>
        </section>

        {/* 요일 */}
        <section>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {DAYS.map((weekday) => (
              <div key={weekday} className="text-center font-bold">
                {weekday}
              </div>
            ))}
          </div>
        </section>

        {/* 날짜 */}
        <section>
          <div className="grid grid-cols-7 gap-2">
            {createCalendarDays().map((date, index) => (
              <div
                key={index}
                className={`text-center p-2 h-12 flex items-center justify-center
                  ${!date ? "text-gray-600" : "hover:bg-gray-800 cursor-pointer"}`}
              >
                {date}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Calendar;
