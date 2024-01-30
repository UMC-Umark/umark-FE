import React, { useState, useEffect, useRef } from 'react';
import adimg from '../img/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import './Header.css';

const Header = () => {
  const [isOpen, setMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenu((prevIsOpen) => !prevIsOpen);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleLinkClick = () => {
    setMenu(false);
  };

  return (
    <header className="bg-black text-white flex justify-between items-center h-24 border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <Link to="/" className="flex items-center  ">
        <img src={adimg} alt="로고" className="header-logo h-22 pl-4" />
      </Link>
      <nav className="hidden md:flex flex-grow justify-center">
    <Link className="header-text" to="/">your bookmark space</Link>
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
                    ? "no-margin-padding w-96 h-screen absolute top-0 right-0 duration-500 transform translate-x-0 transition-transform ease-out bg-orange-500 text-black"
      : "no-margin-padding w-96 h-screen absolute top-0 right-full duration-500 ease-out transform translate-x-full transition-transform bg-green-500 text-black hidden"
                }
              >
                <div className='mt-32 font-bold'>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">최신 북마크</li>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">추천 북마크</li>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">모든 북마크</li>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
                    <Link to="/write" onClick={handleLinkClick}>북마크 작성하기</Link>
                  </li>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
                    <Link to="/mybookmark" onClick={handleLinkClick}>내가 쓴 북마크들</Link>
                  </li>
                </div>
                <div className='mt-16 font-bold'>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">피드 광고 제안</li>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">QnA</li>
                  <li className="text-black cursor-pointer hover:text-white text-2xl my-6 mx-6">
                  <Link to="/intro" onClick={handleLinkClick}>사용 방법</Link>
                  </li>
                  
                </div>
                <AiOutlineClose
                  onClick={closeMenu}
                  className="absolute top-2 right-2 cursor-pointer text-2xl text-black hover:text-white"
                  size={64}
                />
              </ul>
            </div>
    </header>
  );
};

export default Header;

//메뉴아이콘 넣어야함
