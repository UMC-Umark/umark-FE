import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../components/Header.css";
import axios from "axios";

export default function ModifyinfoA() {
  //const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);
  //const [validEmailMessage, setValidEmailMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [univName, setUnivName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const univNameFromStorage = localStorage.getItem("univName");
    const emailFromStorage = localStorage.getItem("email");
    setUnivName(univNameFromStorage);
    setEmail(emailFromStorage);
  }, []);

  const handleModifyInfo = async () => {
    try {
      if (newPassword !== newPasswordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      //if(password..) 회원가입 시 입력했던 비밀번호를 사용자가 잘못 작성하였을 때
      if (password !== localStorage.getItem("password")) {
        alert("현재 비밀번호가 다릅니다.");
        return;
      }
      const memberId = localStorage.getItem("memberId"); // 로그인한 회원의 ID
      const requestBody = {
        email: email,
        newPassword: newPassword,
      };
      const response = await axios.patch(
        `/member/changepassword/${memberId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/allbookmarks");
      } else {
        alert("비밀번호 변경에 실패하였습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류:", error);
      alert("비밀번호 변경에 실패하였습니다.");
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setNewPasswordConfirm(newPasswordConfirm);
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
      isValid && passwordConfirmError === "" && newPasswordConfirm === input
    );
  };
  const validatePasswordConfirm = (input) => {
    const isValid = input === password;
    if (!isValid) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
    setIsValid(isValid && passwordError === "" && password === input);
  };

  return (
    <div className="overflow-hidden flex flex-col h-screen bg-white text-black">
      <Header />
      <div className="flex flex-col items-center mx-auto pt-24 pb-8 px-4 w-full">
        <br />
        <div className="text-center inline-flex font-SUITE">
          <h1 className="text-4xl font-bold my-3 px-10">내 정보 수정</h1>
          <Link to="/LeavePage">
            <p className="text-xl underline my-4 text-gray-500">탈퇴하기</p>
          </Link>
        </div>
        <div className="text-center inline-block relative">
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            학교명
          </span>
          <br />
          <input
            name="univName"
            value={univName}
            readOnly
            className="custom-input3 bg-gray-100 text-gray-500 px-60 py-2 focus:outline-none border-2 border-black"
          />
          <br />
          <br />
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            이메일
          </span>
          <br />
          <input
            name="email"
            value={email}
            readOnly
            className="custom-input1 bg-gray-100 text-gray-500 px-60 py-2 focus:outline-none border-2 border-black"
          />
          <div className="mb-12" />
          <span className="text-lg font-bold absolute left-0 top-50 text-black">
            현재 비밀번호
          </span>
          <br />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input3 bg-white text-gray-500 px-60 py-2 focus:outline-none border-2 border-black"
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="custom-input3 bg-white text-gray-500 px-60 py-2 focus:outline-none border-2 border-black"
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
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            className="custom-input1 bg-white text-gray-500 px-60 py-2 focus:outline-none border-2 border-black"
          />
          {newPasswordConfirm !== "" && isValid && (
            <div className="text-green-600">비밀번호가 일치합니다.</div>
          )}
          <div className="mb-7" />
          <div className="inline-block w-full">
            <Link to="/Recommend">
              <button className="text-xl font-bold border-2 border-black text-black rounded-full px-10 py-2 mr-8">
                수정 취소
              </button>
            </Link>

            <button
              onClick={handleModifyInfo}
              className="text-xl font-bold text-white bg-black rounded-full px-10 py-2 mr-8"
            >
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
