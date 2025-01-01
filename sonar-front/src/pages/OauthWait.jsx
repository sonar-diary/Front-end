import { useParams } from "react-router-dom";

const OauthWait = () => {
  const { loginType } = useParams();
  // 네이버 서버가 준 응답코드 읽기 (팝업창)
  const code = new URL(window.location.href).searchParams.get("code");

  // 팝업창으로 받은 인가코드 부모창으로 전달
  if (code) {
    window.opener.postMessage({ code, type: loginType }, window.opener.origin);
    window.close();
  }
  return <div>OauthWait</div>;
};

export default OauthWait;
