import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";

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
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
