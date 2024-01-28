import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "../css/Login.css";
import arrow from "../img/arrow.png";

export default function Login() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center">
        <Link className="custom-arrow" to="/">
          <img src={arrow} alt="arrow" />
        </Link>
        <h1 className="custom-logintitle text-center inline-block w-1/2">
          login
        </h1>
        <br />
        <br />
      </div>
      <hr />
      <div className="mb-10" />
      <main className="flex-1 flex flex-col items-center justify-center border-white">
        <div className="flex items-center justify-center">
          <div className="mb-20" />
          <img src={logo} alt="umark" />
        </div>
        <br />
        <p className="custom-info1"> 로그인 정보를 입력해 주세요</p>
        <div className="custom-form1 text-center inline-block rounded-lg border-white">
          <div className="mb-8" />
          <div className="relative">
            <span className="custom-loginlabel absolute left-50 top-50 text-white mt-4 ml-5">
              이메일
            </span>
            <input
              name="email"
              className="custom-logininput bg-black text-white px-60 py-4 rounded-full text-left focus:outline-none border border-1 border-white"
            />
            <br />
            <br />
            <span className="custom-loginlabel absolute left-50 top-50 text-white mt-4 ml-5">
              비밀번호
            </span>
            <input
              name="password"
              type="password"
              className="custom-logininput bg-black text-white px-60 py-4 rounded-full focus:outline-none border border-1 border-white"
            />
          </div>
          <div className="mb-12" />
          <Link to="/Umark">
            <button
              type="button"
              className="custom-loginbutton1 bg-green-400 text-black px-60 py-3 rounded-full font-bold"
            >
              로그인
            </button>
          </Link>
          <div className="mb-12" />
          <div className="inline-block w-full">
            <Link to="/Findpassword">
              <p className="custom-links inline-block px-30 underline">
                비밀번호 찾기
              </p>
            </Link>
            <Link to="/Agreement">
              <p className="custom-links inline-block px-30 underline">
                회원가입 하기
              </p>
            </Link>
            <div className="mb-20" />
          </div>
        </div>
      </main>
    </div>
  );
}
