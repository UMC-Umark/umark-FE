import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../components/Header.css";
import axios from "axios";

export default function ModifyinfoA() {
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

  const handleModifyInfo = async () => {
    try {
      //const memberId = 123; // 실제 사용자 ID로 교체
      const requestBody = {
        newPassword: password,
      };

      const response = await axios.patch(`/member/changepassword/{memberId}`);

      if (response.data.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        // 성공 시 처리, 예를 들어 다른 페이지로 이동
      } else {
        alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
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
          <Link to="/LeavePage">
            <p className="text-xl underline my-4 text-gray-500">탈퇴하기</p>
          </Link>
        </div>
        <div className="mb-8" />
        <div className="text-center inline-block relative">
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            학교명
          </span>
          <br />
          <input
            name="univName"
            className="custom-input3 bg-gray-100 text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          <br />
          <br />
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            이메일
          </span>
          <br />
          <input
            name="email"
            className="custom-input1 bg-gray-100 text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          <div className="mb-12" />
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            현재 비밀번호
          </span>
          <br />
          <input
            name="password"
            type="password"
            className="custom-input3 bg-white text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          <br />
          <br />
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            새 비밀번호
          </span>
          <br />
          <input
            name="password"
            type="password"
            className="custom-input3 bg-white text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          <br />
          <br />
          <span className="text-lg font-bold absolute left-0 top-70 text-black">
            비밀번호 확인
          </span>
          <br />
          <input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="custom-input1 bg-white text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          {passwordConfirm !== "" && isValid && (
            <div className="text-green-600">비밀번호가 일치합니다.</div>
          )}
          <div className="mb-10" />
          <div className="inline-block w-full">
            <Link to="/">
              <button className="text-xl font-bold border-2 border-black text-black rounded-full px-10 py-2 mr-8">
                수정 취소
              </button>
            </Link>
            <Link to="/ModifyinfoA">
              <button className="text-xl font-bold text-white bg-black rounded-full px-10 py-2 mr-8">
                수정 완료
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
