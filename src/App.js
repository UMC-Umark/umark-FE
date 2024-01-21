import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bookmark from './pages/Bookmark';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

