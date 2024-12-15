import { useEffect } from "react";
import '../style/Splash.css';

export default function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl font-bold">
          <div className="logo-text">soñar</div>
        </div>
      </div>
    </div>
  );
}
