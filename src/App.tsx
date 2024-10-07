import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./screens/Game";
import { Landing } from "./screens/Landing";

import "./App.css";
import { Login } from "./screens/Login";

function App() {
  return (
    <div className="h-screen bg-chessBackground">
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
