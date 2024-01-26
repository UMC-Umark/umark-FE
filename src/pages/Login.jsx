import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "../css/Login.css";
import arrow from "../img/arrow.png";

export default function Login() {
  return (
    <div className="h-full bg-black text-white">
      <br />
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
      <br />
      <hr />
      <div className="mb-12" />
      <div className="custom-loginform border-white rounded-3xl w-2/3 m-auto h-1/2">
        <div className="flex items-center justify-center">
          <div className="mb-60" />
          <img src={logo} alt="umark" />
        </div>
        <br />
        <br />
        <p className="custom-info"> 로그인 정보를 입력해 주세요</p>
        <div className="custom-form1 text-center inline-block rounded-lg border-white w-full">
          <div className="mb-10" />
          <div className="relative">
            <span className="custom-loginlabel absolute left-50 top-50 text-white mt-4 ml-5">
              이메일
            </span>
            <input
              name="email"
              placeholder="@university.ac.kr"
              className="custom-logininput bg-black text-white w-1/2 px-80 py-6 rounded-full text-left focus:outline-none border border-1 border-white placeholder-white"
            />
            <br />
            <br />
            <span className="custom-loginlabel absolute left-50 top-50 text-white mt-4 ml-5">
              비밀번호
            </span>
            <input
              name="password"
              type="password"
              className="custom-logininput bg-black text-white w-1/2 px-80 py-6 rounded-full focus:outline-none border border-1 border-white"
            />
          </div>
          <div className="mb-12" />
          <Link to="/Umark">
            <button
              type="button"
              className="custom-loginbutton1 bg-green-400 text-black px-80 py-4 rounded-full font-bold"
            >
              로그인
            </button>
          </Link>
          <div className="mb-12" />
          <div className="inline-block w-full">
            <Link to="/Findpassword">
              <p className="inline-block px-30 underline mr-8 text-2xl">
                비밀번호 찾기
              </p>
            </Link>
            <Link to="/Agreement">
              <p className="inline-block px-30 underline text-2xl">
                회원가입 하기
              </p>
            </Link>
            <div className="mb-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
