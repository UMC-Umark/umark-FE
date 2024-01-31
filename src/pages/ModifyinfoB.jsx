import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../components/Header.css";

export default function Findpassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validEmailMessage, setValidEmailMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    setInputValue(newValue);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
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
    setIsValid(isValid);
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
    <div className="overflow-hidden flex flex-col h-screen bg-white text-black">
      <Header />
      <div className="flex flex-col items-center mx-auto pt-24 pb-8 px-4 w-full">
        <br />
        <div className="text-center inline-flex">
          <h1 className="text-4xl font-bold my-3 px-10">내 정보 수정</h1>
          <p className="text-xl underline my-4 text-gray-500">탈퇴하기</p>
        </div>
        <div className="mb-12" />
        <div className="custom-signupform2 text-center inline-block relative">
          <span className="custom-label font-bold absolute ml-4 left-50 top-50 text-black mt-3">
            학교명
          </span>
          <input
            name="univName"
            className="custom-input3 bg-gray-100 text-gray-500 px-60 py-3 rounded-full focus:outline-none border-2 border-black"
          />
          <br />
          <br />
          <span className="custom-label font-bold absolute ml-4 left-50 top-50 text-black mt-3">
            이메일
          </span>
          <input
            name="email"
            className="custom-input1 bg-gray-100 text-gray-500 px-60 py-3 rounded-full focus:outline-none border-2 border-black"
          />
          <div className="mb-20" />
          <span className="custom-label font-bold absolute ml-4 left-50 top-50 text-black mt-3">
            비밀번호
          </span>
          <input
            name="password"
            type="password"
            className="custom-input3 bg-white text-gray-500 px-60 py-3 rounded-full focus:outline-none border-2 border-black"
          />
          <br />
          <br />
          <span className="custom-label font-bold absolute ml-4 left-50 top-70 text-black mt-3">
            비밀번호 확인
          </span>
          <input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="custom-input1 bg-white text-gray-500 px-60 py-3 rounded-full focus:outline-none border-2 border-black"
          />
          {passwordConfirm !== "" && isValid && (
            <div className="text-green-600">비밀번호가 일치합니다.</div>
          )}
          <div className="mb-20" />
          <div className="inline-block w-full">
            <Link to="/">
              <button className="text-xl font-bold border-2 border-black text-black rounded-full px-10 py-2 mr-8">
                수정 취소
              </button>
            </Link>
            <Link to="/ModifyinfoA">
              <button className="text-xl font-bold text-white bg-black rounded-full px-10 py-2 mr-8">
                다음
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
