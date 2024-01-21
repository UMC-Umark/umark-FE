import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Bookmark from "./pages/Bookmark";
import Findpassword from "./pages/Findpassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/write" element={<Bookmark />} />
          <Route path="/Findpassword" element={<Findpassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
