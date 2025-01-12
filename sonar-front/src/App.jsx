import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import DrawingCanvas from "./pages/DrawingCanvas";
import Home from "./pages/Home";
import DearMeLetter from "./pages/DearMeLetter";
import BackgroundColor from "./pages/BackgroundColor";
import BeforeDrawing from "./pages/BeforeDrawing";
import DalleTheme from "./pages/DalleTheme";
import Detail from "./pages/Detail";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="w-full max-w-[400px] min-h-screen bg-black mx-auto relative">
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
            <Route path="/background-color" element={<BackgroundColor />} />
            <Route path="/before-drawing" element={<BeforeDrawing />} />
            <Route path="/dalle-theme" element={<DalleTheme />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
