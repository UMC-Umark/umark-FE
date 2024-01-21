import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Bookmark from "./pages/Bookmark";
import Agreement from "./pages/Agreement";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/write" element={<Bookmark />} />
          <Route path="/Agreement" element={<Agreement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
