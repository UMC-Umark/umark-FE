import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "../css/Login.css";
import arrow from "../img/arrow.png";
//import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
//import { setUserEmail, setUserPassword } from "../api/loginActions";

export default function Login() {
  /*
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const pw = useSelector((state) => state.login.pw);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => {
    dispatch(setUserEmail(e.target.value));
  };

  const handlePw = (e) => {
    dispatch(setUserPassword(e.target.value));
  };

  const onClickConfirmButton = async (e) => {
    if (email === "" || pw === "") {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return; // submit 이벤트 종료
    }
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/user/login", {
        email: email,
        pw: pw,
      });
      console.log(res.data);
      console.log(res.data.isSuccess);
      if (res.data.isSuccess) {
        alert("로그인에 성공했습니다.");
        localStorage.setItem("token", res.data.result.AccessToken); // 토큰 저장
        localStorage.setItem("email", res.data.result.userEmail); // 이메일 저장
      }

      // 통신 완료 후 로딩 해제
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      alert(err);
    }
  };
  */
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
          <Link to="/Umark">
            <button
              type="button"
              className="custom-loginbutton1 bg-green-400 text-black px-60 py-3 rounded-full font-bold"
            >
              {" "}
              {/* onClick={onClickConfirmButton} disabled={isLoading} */}
              로그인
              {/* {isLoading ? "Loading..." : "확인"} */}
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
