import React from "react";
import { useState } from "react";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Check from "../components/Check.jsx";
import arrow from "../img/arrow.png";
import "../css/Password.css";

export default function Findpassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validEmailMessage, setValidEmailMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [nameError, setNameError] = useState("");

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
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    if (!allAgreed) {
      setModalVisible(true);
    } else {
      navigate("/ResetPassword");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center">
        <Link className="custom-arrow" to="/Login">
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
        <div className="flex items-center justify-center">
          <div className="mb-40" />
          <img src={logo} alt="umark" />
        </div>
        <div className="mb-8" />
        <p className="custom-findinfo text-center">
          이메일과 학교명 정보를 입력해 주세요
        </p>
        <div className="mb-8" />
        <div className="custom-findform2 text-center inline-block relative">
          <span className="custom-findlabel1 absolute ml-4 left-50 top-70 text-white mt-4">
            이메일
          </span>
          <input
            name="email"
            placeholder="@university.ac.kr"
            value={email}
            onChange={handleEmailChange}
            className="custom-findinput1 bg-black text-white px-60 py-4 rounded-full text-left focus:outline-none border border-1 border-white placeholder-white"
          />
          <div className="text-red-600">{emailError}</div>
          <br />
          <span className="custom-findlabel1 absolute ml-4 left-50 top-70 text-white mt-4">
            학교명
          </span>
          <input
            name="univName"
            type="text"
            className="custom-findinput1 bg-black text-white px-60 py-4 rounded-full focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <div className="mb-12" />
          <button
            type="button"
            disabled={!isValid}
            className="custom-nextbutton bg-white text-black px-60 py-3 rounded-full font-bold"
            onClick={handleNextButtonClick}
          >
            다음
          </button>
          <div className="mb-12" />
          <div>{modalVisible && <Check closeModal={closeModal} />}</div>
        </div>
      </div>
      <br />
    </div>
  );
}
