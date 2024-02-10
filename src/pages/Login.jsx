import React, { useState } from "react";
import logo from "../img/logo.webp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/Login.css";
import arrow from "../img/arrow.png";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };
      navigate("/Recommend");
    } catch (error) {
      console.error("로그인 중 오류:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center font-SUITE">
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
          <img src={logo} width="100px" height="100px" alt="umark" />
        </div>
        <br />
        <p className="custom-info1"> 로그인 정보를 입력해 주세요</p>
        <div className="custom-form1 text-center inline-block rounded-lg border-white">
          <div className="mb-8" />
          <div className="relative">
            <span className="custom-loginlabel font-bold absolute left-50 top-50 text-black mt-4 ml-5">
              이메일
            </span>
            <input
              name="email"
              className="custom-logininput bg-white text-black px-60 py-4 rounded-full text-left focus:outline-none border border-1"
            />{" "}
            {/* value={email} onChange={handleEmail} */}
            <br />
            <br />
            <span className="custom-loginlabel font-bold absolute left-50 top-50 text-black mt-4 ml-5">
              비밀번호
            </span>
            <input
              name="password"
              type="password"
              className="custom-logininput bg-white text-black px-60 py-4 rounded-full focus:outline-none border border-1"
            />{" "}
            {/* value={pw} onChange={handlePw} */}
          </div>
          <div className="mb-12" />
          <button
            type="button"
            className="custom-loginbutton1 bg-green-400 text-black px-60 py-3 rounded-full font-bold"
          >
            로그인
          </button>
          <div className="mb-12" />
          <div className="inline-block w-full">
            <Link
              to={{ pathname: "/Findpassword", state: location.state?.email }}
            >
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
