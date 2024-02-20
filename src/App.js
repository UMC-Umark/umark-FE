import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Intro from './pages/Intro'
import Bookmark from './pages/Bookmark'
import Agreement from './pages/Agreement'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Report from './pages/Reporting'
import Recommend from './pages/Recommend'
import RecSearchResults from './pages/RecSearchResults'
import AllBookmarks from './pages/AllBookmarks'
import AllSearchResults from './pages/AllSearchResults'
import MyBookmark from './pages/MyBookmark'
import Findpassword from './pages/Findpassword'
import ResetPassword from './pages/ResetPassword'
import ModifyinfoB from './pages/ModifyinfoB'
import ModifyinfoA from './pages/ModifyinfoA'
import LeavePage from './pages/LeavePage'
import ModifyBookmark from './pages/ModifyBookmark'

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
          <Route path="/recommend/search" element={<RecSearchResults />} />          
          <Route path="/allbookmarks" element={<AllBookmarks />} />
          <Route path="/allbookmarks/search" element={<AllSearchResults />} />
          <Route path="/Findpassword" element={<Findpassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ModifyinfoB" element={<ModifyinfoB />} />
          <Route path="/ModifyinfoA" element={<ModifyinfoA />} />
          <Route path="/LeavePage" element={<LeavePage />} />
          <Route
            path="modifyBookmark/:bookmarkId"
            element={<ModifyBookmark />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
