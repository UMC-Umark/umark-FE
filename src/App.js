import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Bookmark from "./pages/Bookmark";
import Agreement from "./pages/Agreement";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Report from "./pages/Reporting";
import Recommend from "./pages/Recommend";
import AllBookmarks from "./pages/AllBookmarks";
import MyBookmark from "./pages/MyBookmark";
import Findpassword from "./pages/Findpassword";
import ResetPassword from "./pages/ResetPassword";
import ModifyinfoB from "./pages/ModifyinfoB";
import ModifyinfoA from "./pages/ModifyinfoA";
import LeavePage from "./pages/LeavePage";
import Updatebookmark from "./pages/Updatebookmark"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/write" element={<Bookmark />} />
          <Route path="/Agreement" element={<Agreement />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/mybookmark" element={<MyBookmark />} />
          <Route path="/Reporting" element={<Report />} />
          <Route path="/Recommend" element={<Recommend />} />
          <Route path="/allbookmarks" element={<AllBookmarks />} />
          <Route path="/Findpassword" element={<Findpassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ModifyinfoB" element={<ModifyinfoB />} />
          <Route path="/ModifyinfoA" element={<ModifyinfoA />} />
          <Route path="/LeavePage" element={<LeavePage />} />
          <Route path="/Updatebookmark" element={<Updatebookmark/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
