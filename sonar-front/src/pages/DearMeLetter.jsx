import { ChevronLeft, X, Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DearMeLetter = () => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customDate, setCustomDate] = useState("");

  const accentColor = "from-indigo-500 to-purple-500";
  const iconColor = "text-indigo-400";

  // 날짜 계산 함수
  const calculateFutureDate = (months) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + months, currentDate.getDate());
    return futureDate;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 sm:p-6 p-4">
        <Link to="/home" className="p-2 sm:p-2 p-1.5">
          <ChevronLeft className="w-6 h-6 sm:w-6 sm:h-6 w-5 h-5" />
        </Link>
        <Link to="/home" className="p-2 sm:p-2 p-1.5">
          <X className="w-6 h-6 sm:w-6 sm:h-6 w-5 h-5" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 sm:px-6 px-4 overflow-y-auto">
        <h1 className="text-2xl sm:text-2xl text-xl font-bold mb-8 sm:mb-8 mb-6">
          미래의 나에게 쓰는
          <br />
          <span className={`bg-gradient-to-br ${accentColor} bg-clip-text text-transparent`}>특별한 편지</span>
        </h1>

        {/* Delivery Date Selection */}
        <div className="mt-8 sm:mt-8 mt-6">
          <h2 className="text-lg sm:text-lg text-sm font-bold mb-3 sm:mb-3 mb-2">받는 날짜</h2>
          <div className="flex space-x-3 sm:space-x-3 space-x-2 overflow-x-auto py-2 sm:py-2 py-1.5">
            {[3, 6, 12].map((months) => (
              <button
                key={months}
                className={`px-4 sm:px-4 px-3 py-3 sm:py-3 py-2.5 rounded-xl flex items-center space-x-2 sm:space-x-2 space-x-1.5 min-w-max transition-all ${
                  selectedPreset === months ? `bg-gradient-to-br ${accentColor} text-white` : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
                onClick={() => {
                  setSelectedPreset(months);
                  setShowCustomDate(false);
                }}
              >
                <Calendar className="w-4 h-4 sm:w-4 sm:h-4 w-3.5 h-3.5" />
                <span className="sm:text-base text-sm">{months}개월 후</span>
              </button>
            ))}
            <button
              className={`px-4 sm:px-4 px-3 py-3 sm:py-3 py-2.5 rounded-xl flex items-center space-x-2 sm:space-x-2 space-x-1.5 min-w-max transition-all ${
                showCustomDate ? `bg-gradient-to-br ${accentColor} text-white` : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
              onClick={() => {
                setShowCustomDate(true);
                setSelectedPreset(null);
              }}
            >
              <Calendar className="w-4 h-4 sm:w-4 sm:h-4 w-3.5 h-3.5" />
              <span className="sm:text-base text-sm">직접 선택</span>
            </button>
          </div>

          {/* Custom Date Picker */}
          {showCustomDate && (
            <div className="mt-3 p-4 sm:p-4 p-3 bg-zinc-800 rounded-xl">
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent border border-zinc-600 rounded-lg p-3 sm:p-3 p-2.5 sm:text-base text-sm text-white focus:border-indigo-400 outline-none [color-scheme:dark]"
              />
            </div>
          )}
        </div>

        {/* Writing Area */}
        <div className="mt-6">
          <div className="bg-zinc-800 rounded-xl p-4 sm:p-4 p-3 min-h-[18rem] sm:min-h-[18rem] h-[280px]">
            <textarea
              placeholder="미래의 나에게 하고 싶은 이야기를 적어보세요..."
              className="w-full h-full bg-transparent resize-none outline-none text-white sm:text-base text-sm placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Preview Box */}
        <div className="mt-6 sm:mt-6 mt-4 p-4 sm:p-4 p-3 bg-zinc-800 rounded-xl">
          <div className="flex items-center space-x-2 mb-2 sm:mb-2 mb-1.5">
            <Mail className={`${iconColor} sm:w-5 sm:h-5 w-4 h-4`} />
            <span className="text-zinc-400 sm:text-base text-xs">편지 도착 예정</span>
          </div>
          <p className="text-lg sm:text-lg text-base">
            {showCustomDate && customDate
              ? new Date(customDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : selectedPreset
              ? calculateFutureDate(selectedPreset).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "날짜를 선택해주세요"}
          </p>
        </div>
      </div>

      {/* Send Button */}
      <div className="p-6 sm:p-6 p-4">
        <button className={`w-full bg-gradient-to-br ${accentColor} text-white py-3 sm:py-3 py-2.5 rounded-lg transition-all hover:opacity-90 shadow-md sm:text-base text-sm`}>
          미래의 나에게 보내기
        </button>
      </div>
    </div>
  );
};

export default DearMeLetter;
