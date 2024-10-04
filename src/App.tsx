import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./screens/Game";
import { Landing } from "./screens/Landing";

import "./App.css";

function App() {
  return (
    <div className="h-screen bg-gray-900">
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
