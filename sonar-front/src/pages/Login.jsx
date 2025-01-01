import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // 로그인 후 홈으로 이동을 위한 코드
  const navigate = useNavigate();
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

  // 팝업창 크기 관련 설정
  const width = 500;
  const height = 500;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  // 1. kakao
  const handleKakaoLogin = () => {
    const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

    window.open(KAKAO_AUTH_URL, "kakao login Popup", `width=${width},height=${height},left=${left},top=${top}`);
  };

  // 2. naver
  const handleNaverLogin = () => {
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_ID;
    const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const STATE = "sonar-login";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;

    window.open(NAVER_AUTH_URL, "naver login Popup", `width=${width},height=${height},left=${left},top=${top}`);
  };

  // 인가코드 넘겨주는 거의 결과가 sonar JWT 토큰
  const getJWTToken = (code, type) => {
    // const url = '백엔드에게 받은 api url'
    axios
      // .get(`${url}?code=${code}&login-type=${type}`)
      // .get(`백엔드에게 받은 api url?code=${code}&login-type=${type}`)
      // .get(`http://localhost:8080?code=${code}&login-type=${type}`)
      .get(`url?code=${code}&login-type=${type}`)

      .then(() => {
        // console.log("데이터 성공", response.data);
        navigate("/home"); // 로그인 후 이동할 페이지로 이동
      })
      .catch((error) => {
        console.error("에러발생:", error);
        alert("로그인에 실패하였습니다."); // 실패 알림
      });
  };

  useEffect(() => {
    const handleMessageEvent = (event) => {
      if (event.data.code && event.data.type) {
        console.log("auth code :", event.data.code);
        getJWTToken(event.data.code, event.data.type);
      }
    };
    // 팝업창으로부터 인가코드 받아오는 이벤트 핸들러
    window.addEventListener("message", handleMessageEvent);
    return () => {
      window.removeEventListener("message", handleMessageEvent);
    };
  }, []);

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
              // handleSocialLogin("Google");
            }}
          >
            Google로 시작하기
          </button>

          <button
            className="w-full py-3 bg-[#FEE500] text-black rounded-full font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleKakaoLogin();
            }}
          >
            Kakao로 시작하기
          </button>

          <button
            className="w-full py-3 bg-[#03C75A] text-white rounded-full font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleNaverLogin();
            }}
          >
            Naver로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
