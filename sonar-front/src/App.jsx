import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import OauthWait from "./pages/OauthWait";
import DrawingCanvas from "./pages/DrawingCanvas";
import Home from "./pages/Home";
import DearMeLetter from "./pages/DearMeLetter";
import Theme from "./pages/Theme";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="w-full max-w-[400px] min-h-screen bg-black mx-auto relative">
      {showSplash ? (
        <Splash onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/return/:loginType" element={<OauthWait />} />
            <Route path="/home" element={<Home />} />
            <Route path="/drawing" element={<DrawingCanvas />} />
            <Route path="/dear-me" element={<DearMeLetter />} />
            <Route path="/theme" element={<Theme />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
