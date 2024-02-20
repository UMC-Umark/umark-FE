import React, { useState, useEffect, useRef } from 'react'
import adimg from '../img/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import './Header.css'
import Hamburgermenu from './Hamburgermenu'
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
        <img src={adimg} alt="로고" className="header-logo h-30 pl-4" />
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
        <Hamburgermenu
          isOpen={isOpen}
          closeMenu={closeMenu}
          isLoggedIn={isLoggedIn}
          handleLinkClick={handleLinkClick}
        />
      </div>
    </header>
  )
}

export default Header
