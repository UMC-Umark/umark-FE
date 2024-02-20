import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Hamburgermenu = ({ isOpen, closeMenu, isLoggedIn, handleLinkClick }) => {
  return (
    <ul
      className={
        isOpen
          ? `fixed w-96 h-full min-h-screen z-30 top-0 right-0 duration-500 transform translate-x-0 transition-transform ease-out ${
              isLoggedIn ? 'bg-orange-500' : 'bg-green-500'
            } text-black w-full sm:w-96 sm:right-0'
            }`
          : `fixed w-96 h-full min-h-screen z-30 top-0 right-0 duration-500 ease-out transform translate-x-full transition-transform ${
              isLoggedIn ? 'bg-orange-500' : 'bg-green-500'
            } text-black w-full sm:w-96 sm:right-0'
            }`
      }
    >
      <div className="mt-32 font-bold">
        {' '}
        {isLoggedIn ? (
          <>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/recommend" onClick={handleLinkClick}>
                추천 북마크
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/allbookmarks" onClick={handleLinkClick}>
                모든 북마크
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/write" onClick={handleLinkClick}>
                북마크 작성하기
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/mybookmark" onClick={handleLinkClick}>
                내가 쓴 북마크들
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/ModifyinfoA" onClick={handleLinkClick}>
                {/* ModifyinfoB는 피그마에서 삭제된 페이지(ModifyinfoB에서 비밀번호 확인을 하고 "다음"을 누른 후 ModifyinfoA에서 비밀번호를 변경하는 형식이었음!) */}
                회원정보 수정
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/recommend" onClick={handleLinkClick}>
                추천 북마크
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/allbookmarks" onClick={handleLinkClick}>
                모든 북마크
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/Login" onClick={handleLinkClick}>
                로그인
              </Link>
            </li>
            <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
              <Link to="/Agreement" onClick={handleLinkClick}>
                회원가입
              </Link>
            </li>
          </>
        )}
        <div className="mt-16 font-bold">
          <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
            <Link to="/intro" onClick={handleLinkClick}>
              사용 방법
            </Link>
          </li>
        </div>
      </div>
      <AiOutlineClose
        onClick={closeMenu}
        className="absolute top-2 right-2 cursor-pointer text-2xl text-black hover:text-white"
        size={64}
      />
    </ul>
  )
}

export default Hamburgermenu
