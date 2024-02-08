import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../components/Header.css";
import axios from "axios";

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
  const [withdrawReason, setWithdrawReason] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };
  const handleWithdrawReasonChange = (e) => {
    setWithdrawReason(e.target.value);
  };
  const handleWithdraw = async () => {
    try {
      // 유효성 검사 로직 추가
      if (passwordConfirmError !== "") {
        setWithdrawError("비밀번호 확인이 올바르지 않습니다.");
        return;
      }

      //const memberId = 123; // 탈퇴할 회원의 ID, 실제로는 해당 회원의 ID로 설정

      const requestBody = {
        passwordConfirm,
        withdrawReason,
      };

      const response = await axios.patch("/member/{memberId}");
      console.log("탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("탈퇴 중 오류:", error);
    }
  };

  return (
    <div className="overflow-hidden flex flex-col h-screen bg-white text-black">
      <Header />
      <div className="flex flex-col items-center mx-auto pt-24 pb-8 px-4 w-full">
        <br />
        <h1 className="text-center text-4xl font-bold my-3">탈퇴하기</h1>
        <div className="mb-8" />
        <div>
          <pre className="text-xl font-bold font-sans">
            {`
    탈퇴하기 전 확인해주세요!
            
    umark는 탈퇴하는 유마커님들의
    정보만 삭제합니다.
            
    작성한 게시글들은 자동으로 삭제되지 않으며
    유마커 페이지에서 삭제해야 합니다.
    탈퇴 시 수정이나 삭제가 불가하니 탈퇴 전에
    확인해주세요.
            `}
          </pre>
          <br />
          <h1 className="text-lg font-bold">탈퇴사유</h1>
          <textarea className="w-full border-2 border-black px-60 py-6 text-left" />
          <div className="mb-5" />
          <h1 className="text-lg font-bold">비밀번호 확인</h1>
          <input
            name="passwordConfirm"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-white text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          <div className="mb-10" />
          <button
            onClick={handleWithdraw}
            className="text-xl font-bold border-2 border-black text-black rounded-full w-full px-60 py-2"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
