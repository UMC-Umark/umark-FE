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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인
  const handleLogin = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };
      const response = await axios.post("/member/login", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.isSuccess) {
        // 응답에서 accessToken, refreshToken 추출 및 저장
        const { accessToken, refreshToken, memberId } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("memberId", memberId.toString());
        setLoginCheck(true);
        navigate("/allbookmarks");
      }

      if (response.data.isSuccess) {
        // 로그인 성공: 토큰 저장 및 상태 업데이트
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setLoginCheck(true);
        navigate("/allbookmarks");
      } else {
        setErrorMessage("잘못된 비밀번호 입니다");
        setLoginCheck(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 401 Unauthorized 응답 처리
        // alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoginCheck(false);
      } else {
        // 그 외 오류 처리
        console.error("로그인 중 오류:", error);
      }
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center font-SUITE">
        <Link className="custom-arrow" to="/">
          <img src={arrow} alt="arrow" />
        </Link>
        <div className="custom-logintitle text-center inline-block w-1/2 text-sm">
          login
        </div>
        <br />
        <br />
      </div>
      <hr />
      <div className="mb-10" />
      <main className="flex-1 flex flex-col items-center justify-center border-white">
        <div className="flex items-center justify-center pt-16">
          <div className="mb-20 " />
          <img src={logo} width="40px" height="40px" alt="umark" />
        </div>
        <br />
        <p className="custom-info1 pt-10"> 로그인 정보를 입력해 주세요</p>
        <div className="custom-form1 text-center inline-block rounded-lg border-white">
          <div className="mb-8" />
          <div className="relative">
            <span className="custom-loginlabel font-bold absolute left-50 top-50 text-black mt-4 ml-5">
              이메일
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={handleFocus}
              className="custom-logininput bg-white text-black px-60 py-4 rounded-full text-left focus:outline-none border border-1"
              placeholder="이메일"
            />
            <br />
            <br />
            <span className="custom-loginlabel font-bold absolute left-50 top-50 text-black mt-4 ml-5">
              비밀번호
            </span>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handleFocus}
              className="custom-logininput bg-white text-black px-60 py-4 rounded-full focus:outline-none border border-1"
              placeholder="비밀번호"
            />
          </div>
          <div className="custom-error-message mb-4 ml-80 text-red-500">{errorMessage}</div>
          <button
            type="button"
            onClick={handleLogin}
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
