import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import DrawingCanvas from "./pages/DrawingCanvas";
import Home from "./pages/Home";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="w-full max-w-[600px] min-h-screen bg-black mx-auto relative">
      {showSplash ? (
        <Splash onFinish={() => setShowSplash(false)} />
      ) : (
        // <Router>
        //   <Routes>
        //     <Route path="/" element={<Login />} />
        //     <Route path="/Home" element={<Home />} />
        //   </Routes>
        // </Router>
        <Router>
          <Routes>
            <Route path="/" element={<DrawingCanvas />} /> {/* 임시로 변경 */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
