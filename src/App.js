import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Bookmark from './pages/Bookmark';
import Report from "./pages/Reporting";
import Recommend from "./pages/Recommend";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/Intro" element ={<Intro/>}/>
          <Route path="/write" element={<Bookmark />} />
          <Route path="/Reporting" element={<Report/>}/>
          <Route path="/Recommend" element={<Recommend/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

