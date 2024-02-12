
import React from 'react';
import './Home.css';
import Header from '../components/Header';
import Intro from './Intro'; 
import { Link } from 'react-router-dom';

function Home() {
  const scrollToIntro = () => {
    document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="h-screen flex flex-col bg-black text-white font-SUITE">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center border-t border-white">
          <h1 className="custom-maintitle font-bold m-0 leading-none">umark</h1>
          <div className="flex1">
            <div className="custom-subtitle-container pt-14 pb-16">
              <p className="custom-subtitle m-8">대학생을 위한</p>
              <p className="custom-subtitle m-8">큐레이션 공간</p>
            </div>
          </div>
          
          <div className="flex2">
            <div className="custom-link-container">
              <div>
                <button className="bg-transparent text-white text-lg border-b border-white p-2 mr-8 cursor-pointer" onClick={scrollToIntro}>사용방법 보러가기</button>         
                <Link className="bg-transparent text-green-500 text-lg border-b border-green-500 p-2 cursor-pointer" to="/Login">로그인 하러가기</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Intro /> 
    </div>
  );
}

export default Home;
