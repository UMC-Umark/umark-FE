import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
<<<<<<< HEAD
import Bookmark from "./pages/Bookmark";
import Signup from "./pages/Signup";
=======
import Bookmark from './pages/Bookmark';
import Report from "./pages/Reporting";
import Recommend from "./pages/Recommend";
>>>>>>> fedc89479c4ce529657315f03b702dc85c818ace

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/write" element={<Bookmark />} />
<<<<<<< HEAD
          <Route path="/Signup" element={<Signup />} />
=======
          <Route path="/Reporting" element={<Report/>}/>
          <Route path="/Recommend" element={<Recommend/>}/>
>>>>>>> fedc89479c4ce529657315f03b702dc85c818ace
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
