import { ChevronRight } from "lucide-react";

const DearMeButton = () => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-8 w-full max-w-[600px] px-4 z-50">
      <button
        className="
          flex items-center justify-between w-full
          bg-gray-900/80 backdrop-blur-md
          px-6 py-4 rounded-2xl
          shadow-lg
          transition-all duration-300
          hover:bg-gray-800/80
        "
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-white text-lg font-medium">미래의 나에게 편지 쓰기</span>
          <span className="text-gray-400 text-sm">마음을 담아 미래로 보내는 이야기</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default DearMeButton;
