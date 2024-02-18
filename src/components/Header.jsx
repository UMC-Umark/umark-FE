import React, { useState, useEffect, useRef } from 'react'
import adimg from '../img/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import './Header.css'

const Header = () => {
  const [isOpen, setMenu] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const isLoggedIn = !!localStorage.getItem('accessToken')

  const toggleMenu = () => {
    setMenu((prevIsOpen) => !prevIsOpen)
  }

  const closeMenu = () => {
    setMenu(false)
  }

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleLinkClick = () => {
    setMenu(false)
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="bg-black text-white flex justify-between items-center h-24 border-b border-gray-200 fixed top-0 left-0 right-0 z-20">
      <Link to="/" className="flex items-center" onClick={scrollToTop}>
        <img src={adimg} alt="로고" className="header-logo h-22 pl-8" />
      </Link>
      <nav className="hidden md:flex flex-grow justify-center">
        <Link
          className={`header-text font-SUITE ${
            isLoggedIn ? 'text-black' : 'text-white'
          }`}
          to="/"
          onClick={scrollToTop}
        >
          your bookmark space
        </Link>
      </nav>
      <div className="relative ml-auto pr-5" ref={menuRef}>
        <GiHamburgerMenu
          onClick={toggleMenu}
          className="cursor-pointer"
          size={55}
        />
        <ul
          className={
            isOpen
              ? `no-margin-padding w-96 h-screen absolute top-0 right-0 duration-500 transform translate-x-0 transition-transform ease-out ${
                  isLoggedIn ? 'bg-orange-500' : 'bg-green-500'
                } text-black`
              : `no-margin-padding w-96 h-screen absolute top-0 right-full duration-500 ease-out transform translate-x-full transition-transform ${
                  isLoggedIn ? 'bg-orange-500' : 'bg-green-500'
                } text-black hidden`
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
                  <Link to="/Signup" onClick={handleLinkClick}>
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
      </div>
    </header>
  )
}

export default Header
