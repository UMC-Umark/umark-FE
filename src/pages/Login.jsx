import React, {useState} from 'react'
import logo from "../img/logo.png";
import {Link} from 'react-router-dom';

export default function Login() {


  return (
    <div>
      <div className="inline-block w-full">
      <Link to="/"><p className="px-5 py-2 rounded-3xl inline-block text-5xl mr-80">←</p></Link>
      <div className="mr-10 inline-block justify-items-center"></div>
      <h1 className="text-6xl font-bold text-center inline-block ml-80 w-1/2">login</h1><br /><br />
      </div>
      <br />
      <hr />
      <br />
      <br />
      <div className="flex items-center justify-center">
        <div className="mb-60" />
        <img src={logo} alt="umark" />
      </div>
      <div className="mb-10" />
      <div className="text-center inline-block rounded-lg border-white w-full">
        <br />
        <p className="text-4xl"> 로그인 정보를 입력해 주세요</p>
        <div className="mb-10" />
        <span className="absolute left-50 top-50 text-white mt-4 text-2xl font-bold ml-4">이메일</span>
        <input name="email" placeholder="          @university.ac.kr" className="bg-black text-white w-1/3 px-80 py-6 rounded-full text-left focus:outline-none border border-1 border-white placeholder-white"/><br /><br />
        <span className="absolute left-50 top-50 text-white mt-4 text-2xl font-bold ml-4">비밀번호</span>
        <input name="password" type="password" className="bg-black text-white w-1/3 px-80 py-6 rounded-full focus:outline-none border border-1 border-white"></input>
        <div className="mb-12" />
          <button
            type="button"
            className="bg-green-400 text-black w-1/3 px-80 py-5 rounded-full font-bold text-3xl"
          >
            로그인
          </button>
          <div className="mb-12" />
          <div className="inline-block w-full">
            <Link to="/Findpassword"><p className="inline-block px-30 underline mr-10 text-2xl">비밀번호 찾기</p></Link>
            <Link to="/Agreement"><p className="inline-block px-30 underline text-2xl">회원가입 하기</p></Link>
            <div className="mb-80" />
          
          </div>
        </div>
      </div>
  );
}
