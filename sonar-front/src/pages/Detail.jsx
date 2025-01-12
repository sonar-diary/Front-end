import { ChevronDown, MoreVertical } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "../store/drawingStore";
import { useEffect } from "react";

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state || {};
  const diaries = useStore((state) => state.diaries); // diaryEntries 대신 diaries
  const diaryEntry = date ? diaries.find((diary) => diary.diaryDate === date) : null; // diaryDate로 찾기

  useEffect(() => {
    if (!diaryEntry) {
      navigate("/home");
    }
  }, [diaryEntry, navigate]);

  if (!diaryEntry) {
    return null;
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: diaryEntry.color }}>
      <div className="flex items-center justify-between p-4">
        <ChevronDown className="w-6 h-6 text-white" onClick={() => navigate(-1)} />
        <div className="flex gap-4">
          <MoreVertical className="w-6 h-6 text-white" onClick={() => navigate("/home")} />
        </div>
      </div>

      <div className="text-center text-white mt-3">
        <h1 className="text-2xl font-bold">{formattedDate}</h1>
      </div>

      <div className="flex justify-center mt-6">
        <span className="px-3 py-1 rounded-full text-white/80 bg-black/20 text-sm">#{diaryEntry.hashtag}</span>
      </div>

      <div className="px-10 mt-9">
        <div className="aspect-square w-full rounded-3xl overflow-hidden">{diaryEntry.imageUrl && <img src={diaryEntry.imageUrl} alt="Drawing" className="w-full h-full object-cover" />}</div>
      </div>

      <div className="flex flex-col items-center mt-6">
        <div className="flex gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
        <p className="text-white/90 text-center">{diaryEntry.diaryContent}</p>
      </div>
    </div>
  );
}

export default Detail;
