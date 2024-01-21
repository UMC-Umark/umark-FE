import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/Intro" element ={<Intro/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

