// Calendar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Lock, Unlock } from "lucide-react";
import MonthSelectModal from "./MonthSelectModal";
import useStore from "../../store/drawingStore";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const TEMP_LETTERS = [
  {
    id: "1",
    content: "내용 1",
    openDate: new Date(2024, 11, 25),
  },
  {
    id: "2",
    content: "내용 2",
    openDate: new Date(2024, 11, 31),
  },
];

function Calendar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [monthModalOpen, setMonthModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const diaries = useStore((state) => state.diaries);
  const setSelectedDate = useStore((state) => state.setSelectedDate);
  const resetDiaryForm = useStore((state) => state.resetDiaryForm);

  const today = new Date();
  const TODAY_YEAR = today.getFullYear();
  const TODAY_MONTH = today.getMonth();
  const TODAY_DATE = today.getDate();

  const isCurrentDay = (date) => {
    return date === TODAY_DATE && month === TODAY_MONTH && year === TODAY_YEAR;
  };

  const isFutureDate = (date) => {
    if (!date) return false;
    const calendarDate = new Date(year, month, date);
    const todayDate = new Date(TODAY_YEAR, TODAY_MONTH, TODAY_DATE);
    return calendarDate > todayDate;
  };

  const getLetterForDate = (date) => {
    if (!date) return null;
    return TEMP_LETTERS.find((letter) => {
      const letterDate = letter.openDate;
      return (
        letterDate.getDate() === date &&
        letterDate.getMonth() === month &&
        letterDate.getFullYear() === year
      );
    });
  };

  const createCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    return days;
  };

  const swipeMonth = useSwipeable({
    onSwipedRight: () => {
      setCurrentDate(new Date(year, month - 1));
    },
    onSwipedLeft: () => {
      setCurrentDate(new Date(year, month + 1));
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const renderDateCell = (date, index) => {
    if (!date) {
      return <div key={index} className="text-gray-600" />;
    }

    const hasLetter = getLetterForDate(date);
    const isToday = isCurrentDay(date);
    const isFuture = isFutureDate(date);
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
    const diaryEntry = diaries.find((diary) => diary.diaryDate === dateString);

    if (activeTab === "diary") {
      return (
        <div
          key={index}
          onClick={() => {
            if (!isFuture) {
              resetDiaryForm();
              console.log("[Calendar] BackgroundColor로 이동:", dateString);
              setSelectedDate(dateString); // store에 날짜 저장
              if (diaryEntry) {
                navigate("/detail", {
                  state: {
                    date: dateString,
                    diaryId: diaryEntry.diaryId,
                  },
                });
              } else {
                navigate("/background-color", {
                  state: { 
                    date: dateString,
                    from: 'calendar'
                  }
                });
              }
            }
          }}
          className={`text-center p-1 sm:p-2 aspect-square rounded-[35%] flex flex-col
            ${
              isFuture
                ? "text-gray-600 cursor-not-allowed"
                : "hover:bg-gray-800 cursor-pointer rounded-lg"
            }`}
        >
          <div
            className={`w-full aspect-square rounded-[35%] relative overflow-hidden
              ${
                isToday
                  ? "bg-gradient-to-r from-[#7969f4] to-[#822fd5]"
                  : isFuture
                  ? "bg-zinc-900"
                  : diaryEntry
                  ? diaryEntry.color
                  : "bg-zinc-700"
              }`}
          >
            {diaryEntry && (
              <img
                src={diaryEntry.imageUrl}
                alt="일기 그림"
                className="w-full h-full object-cover"
              />
            )}
            {isToday && !diaryEntry && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl">+</span>
              </div>
            )}
          </div>
          <div className="text-center">{date}</div>
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className={`text-center p-1 sm:p-2 aspect-square rounded-[35%] flex flex-col
           ${hasLetter ? "cursor-pointer" : "text-gray-600"}`}
        >
          <div
            className={`w-full aspect-square rounded-[35%] relative ${
              hasLetter
                ? isFuture
                  ? "bg-zinc-700"
                  : "bg-gradient-to-br from-purple-500 to-purple-700"
                : "bg-zinc-900"
            } mb-0.5 sm:mb-1`}
          >
            {hasLetter && (
              <div className="absolute inset-0 flex items-center justify-center">
                {isFuture ? (
                  <Lock className="w-5 h-5 text-purple-400" />
                ) : (
                  <Unlock className="w-5 h-5 text-white" />
                )}
              </div>
            )}
          </div>
          <div className="text-center">{date}</div>
        </div>
      );
    }
  };

  useEffect(() => {
    resetDiaryForm();
  }, []);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 mt-6 bg-black text-white">
        <section>
          <div className="flex justify-between items-center mb-4 sm:mb-8">
            <h2
              className="flex items-center text-2xl sm:text-3xl font-bold cursor-pointer"
              onClick={() => {
                setMonthModalOpen(true);
              }}
            >
              {year}년 {month + 1}월
            </h2>
          </div>
        </section>

        <div className="flex border-b border-zinc-700 mb-8 mt-">
          <button
            onClick={() => setActiveTab("diary")}
            className={`flex-1 py-2 px-4 font-medium text-sm sm:text-base transition-colors
             ${
               activeTab === "diary"
                 ? "text-white border-b-2 border-white"
                 : "text-gray-400 hover:text-gray-300"
             }`}
          >
            그림일기
          </button>
          <button
            onClick={() => setActiveTab("letter")}
            className={`flex-1 py-2 px-4 font-medium text-sm sm:text-base transition-colors
             ${
               activeTab === "letter"
                 ? "text-white border-b-2 border-white"
                 : "text-gray-400 hover:text-gray-300"
             }`}
          >
            나에게 쓰는 편지
          </button>
        </div>

        <section>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {DAYS.map((weekday, index) => (
              <div
                key={weekday}
                className={`text-center font-bold text-sm sm:text-lg ${
                  index === 0 ? "text-red-500" : ""
                }`}
              >
                {weekday}
              </div>
            ))}
          </div>
        </section>

        <section {...swipeMonth} className="touch-action-pan-y sm:mb-80">
          <div className="grid grid-cols-7 gap-x-1 gap-y-4 sm:gap-x-2 sm:gap-y-6 text-sm sm:text-lg">
            {createCalendarDays().map((date, index) =>
              renderDateCell(date, index)
            )}
          </div>
        </section>

        <MonthSelectModal
          isOpen={monthModalOpen}
          onClose={() => setMonthModalOpen(false)}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          year={year}
          month={month}
        />
      </div>
    </>
  );
}

export default Calendar;