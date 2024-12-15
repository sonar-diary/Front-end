import { useState } from "react";

export default function Login() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Write & Draw",
      description: "오늘 하루를 그림과 글로 담아보세요.",
      subText: "몰라의 감성으로 여행하며 기록합니다.",
    },
    {
      title: "Memory",
      description: "소중했던 순간들을 보관하세요.",
      subText: "너만의 추억 컬렉션을 만들어보세요.",
    },
    {
      title: "Dear Me",
      description: "미래의 나에게 전하는 이야기",
      subText: "시간을 넘어 나와 마주합니다.",
    },
  ];

  const handleClick = (e) => {
    if (!e.target.closest("button")) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 소셜로그인 버튼`);
  };

  return (
    <div className="relative h-screen bg-black text-white" onClick={handleClick}>
      <div className="flex flex-col h-full">
        <div className="flex-1 pt-8 px-6 text-center">
          <h1 className="text-3xl font-bold mb-6">{slides[currentSlide].title}</h1>
          <p className="text-lg mb-3">{slides[currentSlide].description}</p>
          <p className="text-sm text-gray-400">{slides[currentSlide].subText}</p>
        </div>

        <div className="relative w-full px-8 pb-10 space-y-4">
          <div className="flex justify-center gap-3 mb-4">
            {slides.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-gray-600"}`} />
            ))}
          </div>
          <button
            className="w-full py-3 bg-white text-black rounded-full font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSocialLogin("Google");
            }}
          >
            Google로 시작하기
          </button>

          <button
            className="w-full py-3 bg-[#FEE500] text-black rounded-full font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSocialLogin("Kakao");
            }}
          >
            Kakao로 시작하기
          </button>

          <button
            className="w-full py-3 bg-[#03C75A] text-white rounded-full font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleSocialLogin("Naver");
            }}
          >
            Naver로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
