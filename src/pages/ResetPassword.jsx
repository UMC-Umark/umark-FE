import React from "react";
import { useState } from "react";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../img/arrow.png";
import "../css/Password.css";

export default function ResetPassword() {
  return (
    <div className="h-screen bg-black text-white">
      <div className="w-full flex justify-between items-center">
        <Link className="custom-arrow" to="/Findpassword">
          <img src={arrow} alt="arrow" />
        </Link>
        <h1 className="custom-findtitle text-center inline-block w-1/2">
          비밀번호 찾기
        </h1>
        <div className="mb-5" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-findform1 border border-1 border-white rounded-3xl w-2/3 m-auto">
        <div className="flex items-center justify-center ">
          <div className="mb-40" />
          <img src={logo} alt="umark" />
        </div>
        <br />
        <br />
        <p className="custom-findinfo text-center">비밀번호를 재설정해주세요</p>
        <br />
        <div className="custom-findform2 text-center inline-block relative">
          <span className="custom-findlabel2 absolute ml-4 left-50 top-70 text-white mt-3 text-2xl">
            비밀번호
          </span>
          <input
            name="email"
            placeholder="8자리 이상, 특수문자 포함"
            className="custom-findinput2 bg-black text-white w-1/2 px-40 py-4 rounded-full text-left focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <div className="mb-6" />
          <span className="custom-findlabel2 absolute ml-4 left-50 top-70 text-white mt-3 text-2xl">
            비밀번호 확인
          </span>
          <input
            name="name"
            type="text"
            className="custom-findinput1 bg-black text-white w-1/2 px-40 py-4 rounded-full focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <div className="mb-12" />
          <Link to="/Login">
            <button
              type="button"
              className="custom-tologin bg-green-400 text-black px-60 py-2 rounded-full font-bold"
            >
              로그인 하러가기
            </button>
          </Link>
          <div className="mb-60" />
        </div>
      </div>
    </div>
  );
}
