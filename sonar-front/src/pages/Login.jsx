import { useState } from "react";
// 카카오 소셜 로그인 사용하기 위해 import!
import KakaoLogin from "react-kakao-login";
// 이동을 위한 useNavigate
import { useNavigate } from "react-router-dom";

export default function Login() {
  // 로그인 후 홈으로 이동을 위한 코드
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const kakaoSuccess = (response) => {
    console.log("카카오 로그인 성공", response);
    console.log("전체 응답:", response);
    // 아래 코드는 사용자 정보 확인하는 코드
    try {
      const { profile } = response;
      if (profile) {
        console.log("닉네임:", profile.nickname);
        console.log("프로필 사진:", profile.thumbnail_image_url);
        const userData = {
          id: profile.id,
          nickname: profile.properties.nickname,
          profileImage: profile.properties.profile_image,
          connectedAt: profile.connected_at,
        };
        console.log("정리된 사용자 정보:", userData);
        navigate("home");
      }
    } catch (error) {
      console.error("사용자 정보 파싱 실패:", error);
    }
  };
  const kakaoFail = (error) => {
    console.log("카카오 로그인 실패", error);
  };

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
    navigate("/home");
  };

  return (
    <div className="relative h-screen bg-black text-white" onClick={handleClick}>
      <div className="flex flex-col h-full">
        <div className="flex-1 pt-8 px-12 text-center">
          <h1 className="text-3xl font-bold mb-6">{slides[currentSlide].title}</h1>
          <p className="text-lg mb-3">{slides[currentSlide].description}</p>
          <p className="text-sm text-gray-400">{slides[currentSlide].subText}</p>
        </div>

        <div className="relative w-full px-16 pb-10 space-y-4">
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

          <KakaoLogin
            token="8f062d92f626700c83b00d7bf25aee69"
            onSuccess={kakaoSuccess}
            onFail={kakaoFail}
            render={({ onClick }) => (
              <button
                className="w-full py-3 bg-[#FEE500] text-black rounded-full font-medium text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                kakao로 시작하기
              </button>
            )}
          />

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
