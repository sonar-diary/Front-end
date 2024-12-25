import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Calendar from "../components/Homepage/Calendar";
import DearMeButton from "../components/Homepage/DearMeButton";

function Home() {
  const [activeTab, setActiveTab] = useState("diary");
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // 모바일 체크
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스크롤 이벤트 (웹 버전에서만 적용)
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile && activeTab === "letter") {
        const scrollThreshold = window.innerHeight * 0.3;
        setShowButton(window.scrollY > scrollThreshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, activeTab]);

  // 모바일에서는 letter 탭일 때 항상 버튼 표시
  useEffect(() => {
    if (isMobile) {
      setShowButton(activeTab === "letter");
    }
  }, [isMobile, activeTab]);

  return (
    <div className="relative">
      <Calendar activeTab={activeTab} setActiveTab={setActiveTab} />
      {showButton && (
        <Link to="/dear-me">
          <DearMeButton />
        </Link>
      )}
    </div>
  );
}

export default Home;
