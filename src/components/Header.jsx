import React from 'react';
import adimg from '../img/umark_logo_white-13.webp';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="bg-black text-white flex justify-between items-center h-18 p-4 border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <Link to="/" className="flex items-center">
        <img src={adimg} alt="로고" className="header-logo h-16" /> {/* 로고 이미지 높이를 h-16으로 조절 */}
      </Link>
      <nav className="hidden md:flex">
        <Link className="header-text" to="/">your bookmark space</Link>
      </nav>
      <Link className="text-lg" to="/menu">메뉴</Link> {/* 메뉴 텍스트 크기를 text-lg로 조절 */}
    </header>
  );
};

export default Header;

//메뉴아이콘 넣어야함
