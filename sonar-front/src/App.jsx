import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./components/Splash";
import Login from "./pages/Login";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="w-full max-w-[600px] min-h-screen bg-black mx-auto relative">
      {showSplash ? (
        <Splash onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
