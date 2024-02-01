import React from "react";
import { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import arrow from "../img/arrow.png";
import "../css/Signup.css";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [univName, setUnivName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validEmailMessage, setValidEmailMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [inputValue, setInputValue] = useState("");

  // 인증 메일 전송
  const handleSendVerification = async () => {
    try {
      const requestBody = {
        email: email,
        univName: univName,
      };
      const response = await axios.post("/member/sendemail", requestBody);
      if (response.data.isSuccess) {
        setVerifyError("성공하였습니다.");
      } else {
        setVerifyError("실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("메일 인증 전송 중 오류:", error);
      setVerifyError("인증번호 전송 중 오류가 발생했습니다.");
    }
  };

  // 인증 코드 체크
  const handleVerifyCode = async () => {
    try {
      const requestBody = {
        email: email,
        univName: univName,
        code: parseInt(inputValue), // inputValue를 정수로 변환하여 전달
      };
      const response = await axios.post("/member/checkcode", requestBody);

      if (response.data.isSuccess) {
        setVerifyError("성공하였습니다.");
      } else {
        setVerifyError("인증이 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("인증 코드 확인 중 오류:", error);
      setVerifyError("인증 코드 확인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입
  const handleSignUp = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
        terms: [1, 2],
      };

      const response = await axios.post("/member/signup", requestBody);

      if (response.data.isSuccess) {
        alert("회원가입이 완료되었습니다.");
        // 회원가입 성공 시, 로그인 페이지로 이동 또는 다른 처리
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 중 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    setInputValue(newValue);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };
  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
    validatePasswordConfirm(newPasswordConfirm);
  };
  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[^@]+\.ac\.kr$/;
    const isValid = emailRegex.test(input);
    if (!isValid) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
      //setValidEmailMessage('올바른 이메일 형식입니다.');
    }
    setIsValid(isValid && passwordError === "" && passwordConfirmError === "");
  };
  const validatePassword = (input) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValid = passwordRegex.test(input);
    if (!isValid) {
      setPasswordError(
        "영문, 숫자, 특수문자를 조합하여 8자 이상이어야 합니다."
      );
    } else {
      setPasswordError("");
    }
    setIsValid(
      isValid &&
        emailError === "" &&
        passwordConfirmError === "" &&
        passwordConfirm === input
    );
  };
  const validatePasswordConfirm = (input) => {
    const isValid = input === password;
    if (!isValid) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
    setIsValid(
      isValid && emailError === "" && passwordError === "" && password === input
    );
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center">
        <Link className="custom-arrow" to="/Agreement">
          <img src={arrow} alt="arrow" />
        </Link>
        <h1 className="custom-signuptitle text-center inline-block w-1/2">
          sign up
        </h1>
        <div className="mb-12" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-signupform1 border border-1 border-white rounded-3xl w-2/3 m-auto">
        <br />
        <div className="flex items-center justify-center">
          <img src={logo} alt="umark" />
        </div>
        <div className="mb-5" />
        <p className="custom-info2">회원가입 정보를 입력해 주세요</p>
        <div className="mb-8" />
        <div className="custom-signupform2 text-center inline-block relative">
          <span className="custom-label absolute ml-4 left-50 top-50 text-white mt-3">
            학교명
          </span>
          <input
            name="univName"
            placeholder="정확한 학교명을 적어주세요"
            className="custom-input3 bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white placeholder-white"
          />
          <br />
          <br />
          <span className="custom-label absolute ml-4 left-50 top-50 text-white mt-3">
            이메일
          </span>
          <input
            name="email"
            placeholder="@duksung.ac.kr"
            value={email}
            onChange={handleEmailChange}
            className="custom-input1 bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white placeholder-white"
          />
          <br />
          {/* <div className="text-red-600">{emailError}</div> */}
          {isValid && (
            <div className="text-green-600">올바른 이메일 형식입니다.</div>
          )}
          <br />
          <button
            type="button"
            onClick={handleSendVerification}
            className="custom-sendbutton bg-white text-black w-1/6 px-8 py-4 rounded-full mr-4 font-bold"
          >
            인증번호 전송
          </button>
          <input
            type="text"
            maxLength="4"
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input2 bg-black text-white w-1/5 mr-4 px-20 py-4 rounded-full text-left focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <button
            onClick={handleVerifyCode}
            className="custom-endbutton1 bg-black text-white w-1/7 px-10 py-4 rounded-full focus:outline-none border border-1 border-white"
          >
            완료
          </button>
          <div className="text-red-600">{verifyError}</div>
          {/* {isValid && <div className="text-green-600">인증이 완료되었습니다</div>}<br /> */}
          <div className="mb-10" />
          <span className="custom-label absolute ml-4 left-50 top-50 text-white mt-3">
            비밀번호
          </span>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="8자리 이상, 특수문자 포함"
            onChange={handlePasswordChange}
            className="custom-input3 bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <br /> {/* placeholder:8자리 이상, 특수문자 포함 */}
          {/* <div className="text-red-600">{passwordError}</div> */}
          {password !== "" && isValid && (
            <div className="text-green-600">올바른 비밀번호 형식입니다.</div>
          )}
          <br />
          <span className="custom-label absolute ml-4 left-50 top-70 text-white mt-3">
            비밀번호 확인
          </span>
          <input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="custom-input1 bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white"
          />
          <br />
          {/* <div className="text-red-600">{passwordConfirmError}</div> */}
          {passwordConfirm !== "" && isValid && (
            <div className="text-green-600">비밀번호가 일치합니다.</div>
          )}
          <div className="mb-7" />
          <Link to="/Login">
            <button
              type="button"
              disabled={!isValid}
              onClick={handleSignUp}
              className="custom-endbutton2 bg-white text-black px-80 py-4 rounded-full font-bold"
            >
              완료
            </button>
          </Link>
          <div className="mb-10" />
        </div>
      </div>
      <br />
    </div>
  );
}
