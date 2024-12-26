import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import DrawingCanvas from "./pages/DrawingCanvas";
import Home from "./pages/Home";
import DearMeLetter from "./pages/DearMeLetter";

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
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/drawing" element={<DrawingCanvas />} />
            <Route path="/dear-me" element={<DearMeLetter />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
