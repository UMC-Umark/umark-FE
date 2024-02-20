// 수정 코드
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../components/Header.css";
import axios from "axios";

export default function Findpassword() {
  const [isValid, setIsValid] = useState(false);
  const [validEmailMessage, setValidEmailMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

    const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('/member/reissue', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
      return accessToken
    } catch (error) {
      console.error('Refresh token error:', error)
      // Refresh Token이 유효하지 않을 경우 로그인 페이지로 이동할 수 있습니다.
      // navigate('/login');
      return null
    }
  }

  const navigate = useNavigate();

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
      isValid && passwordConfirmError === "" && passwordConfirm === input
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleWithdrawReasonChange = (e) => {
    setWithdrawReason(e.target.value);
  };

  // 회원 탈퇴
  const handleWithdraw = async () => {
    let accessToken = localStorage.getItem('accessToken')
      const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      }
      
      const memberId = localStorage.getItem("memberId"); // 로그인한 회원의 ID
      const requestBody = {
        passwordConfirm: passwordConfirm,
      };

    try {
      // 유효성 검사 로직 추가
      if (passwordConfirm === "") {
        setPasswordConfirmError("비밀번호를 입력해주세요");
        return;
      }
      
      const response = await axios.patch(`/member/${memberId}`, requestBody, { headers });
      console.log(response);

      if (response.data.isSuccess) {
        localStorage.clear();
        navigate("/login");
      } else {
        setWithdrawError("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access Token이 만료된 경우
        const newAccessToken = await refreshAccessToken() // 새로운 Access Token을 얻습니다.
        if (newAccessToken) {
          // 새로운 Access Token으로 요청을 재시도합니다.
          accessToken = newAccessToken // 새로운 accessToken으로 업데이트
          localStorage.setItem('accessToken', accessToken) // 로컬 스토리지 업데이트
          try {
            const response = await axios.patch(`/member/${memberId}`, requestBody, { headers });
            console.log(response);

            if (response.data.isSuccess) {
              localStorage.clear();
              navigate("/login");
            } else {
              setWithdrawError("회원 탈퇴에 실패했습니다.");
            }
          } catch (retryError) {
            console.error('Retry failed:', retryError) // 재시도 요청 실패 처리
          }
        }
      } else {
        console.error('Request failed:', error) // 다른 종류의 오류 처리
      }
    }
  }

  return (
    <div className="overflow-hidden flex flex-col h-screen bg-white text-black">
      <Header />
      <div className="flex flex-col items-center mx-auto pt-24 pb-8 px-4 w-full">
        <br />
        <h1 className="text-center text-4xl font-bold my-3">탈퇴하기</h1>
        <div className="mb-8" />
        <div>
          <div className="text-xl">
            <p>탈퇴하기 전 확인해주세요!</p>
            <br />
            <p>umark는 탈퇴하는 유마커님들의</p>
            <p>정보만 삭제합니다.</p>
            <br />
            <p>작성한 게시글들은 자동으로 삭제되지 않으며</p>
            <p>유마커 페이지에서 삭제해야 합니다.</p>
            <p>탈퇴 시 수정이나 삭제가 불가하니 탈퇴 전에</p>
            <p>확인해주세요.</p>
          </div>
          <br />
          <h1 className="text-lg font-bold">탈퇴사유</h1>
          <textarea
            value={withdrawReason}
            onChange={handleWithdrawReasonChange}
            className="w-full border-2 border-black px-60 py-6 text-left"
          />
          <div className="mb-5" />
          <h1 className="text-lg font-bold">비밀번호 확인</h1>
          <input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            className="bg-white text-gray-500 px-60 py-3 focus:outline-none border-2 border-black"
          />
          {passwordConfirmError && (
            <p className="text-red-500">{passwordConfirmError}</p>
          )}
          <div className="mb-10" />
          {withdrawError && <p className="text-red-500">{withdrawError}</p>}
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