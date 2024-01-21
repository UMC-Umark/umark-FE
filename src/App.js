import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/Recommend" element ={<Recommend/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

