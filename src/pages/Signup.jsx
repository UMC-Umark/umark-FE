import React from 'react'
import { useState } from "react";
import logo from "../img/logo.png";
import {Link} from 'react-router-dom';

export default function Signup() {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [passwordConfirm, setPasswordConfirm]=useState('');
    const [emailError, setEmailError]=useState('');
    const [passwordError, setPasswordError]=useState('');
    const [passwordConfirmError, setPasswordConfirmError]=useState('');
    const [isValid, setIsValid]=useState(false);
    const [validEmailMessage, setValidEmailMessage] = useState('');
    const [verifyError, setVerifyError]=useState('');
    const [nameError, setNameError]=useState('');

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      const newValue = e.target.value.toUpperCase();
      setInputValue(newValue);
    };
    const handleEmailChange = (e) => {
        const newEmail=e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };
    const handlePasswordChange = (e) => {
      const newPassword=e.target.value;
      setPassword(newPassword);
      validatePassword(newPassword);
    }
    const handlePasswordConfirmChange = (e) => {
      const newPasswordConfirm=e.target.value;
      setPasswordConfirm(newPasswordConfirm);
      validatePasswordConfirm(newPasswordConfirm);
    }
    const validateEmail = (input) => {
        const emailRegex=/^[a-zA-Z0-9._-]+@[^@]+\.ac\.kr$/;
        const isValid=emailRegex.test(input);
        if(!isValid){
          setEmailError('올바른 이메일 형식이 아닙니다.');
        }
        else{
          setEmailError('');
          //setValidEmailMessage('올바른 이메일 형식입니다.');
        }
        setIsValid(isValid && passwordError === '' && passwordConfirmError === '');

    }
    const validatePassword = (input) => {
      const passwordRegex=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      const isValid=passwordRegex.test(input);
      if(!isValid){
        setPasswordError('영문, 숫자, 특수문자를 조합하여 8자 이상이어야 합니다.');
      }
      else{
        setPasswordError('');
      }
      setIsValid(isValid && emailError === '' && passwordConfirmError === '' && passwordConfirm === input);
    }
    const validatePasswordConfirm = (input) => {
      const isValid=input===password;
      if(!isValid){
        setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
      }
      else{
        setPasswordConfirmError('');
      }
      setIsValid(isValid && emailError === '' && passwordError === '' && password === input);
    }
  return (
    <div>
      <div className="inline-block w-full">
      <Link to="/Agreement"><p className="px-5 py-2 rounded-3xl inline-block text-5xl mr-80">←</p></Link>
      <h1 className="text-6xl font-bold text-center inline-block ml-80 w-1/2">sign up</h1><br /><br />
      </div>
      <br />
      <hr />
      <div className="mb-20" />
      <div className="border border-1 border-white rounded-3xl w-2/3 m-auto h-1/2"><br />
      <div className="flex items-center justify-center">
        <img src={logo} alt="umark" />
      </div>
      <div className="mb-12" />
      <p className="text-center text-4xl">회원가입 정보를 입력해 주세요</p>
      <div className="mb-12" />
      <div className="text-center inline-block w-full relative">
      <span className="absolute ml-4 left-50 top-2 text-white text-2xl mt-3 font-bold">이메일</span>
      <input name="email" placeholder="name@duksung.ac.kr" value={email} onChange={handleEmailChange} className="bg-black text-white w-1/2 px-80 py-6 rounded-full text-left focus:outline-none border-2 border-white placeholder-gray-300 placeholder-shown:font-bold"/><br />
      <div className="text-red-600">{emailError}</div>
      {isValid && <div className="text-green-600">올바른 이메일 형식입니다.</div>}<br />
      <button type="button" className="bg-white text-black w-1/6 px-8 py-5 rounded-full mr-4 text-2xl font-bold">인증번호 전송</button>
      <input type="text" maxLength="6" value={inputValue} onChange={handleInputChange}
      className="bg-black text-white w-1/5 mr-4 px-20 py-6 rounded-full text-left focus:outline-none border-2 border-white placeholder-gray-300"/>
      <button className="bg-black text-white text-2xl px-20 py-5 rounded-full focus:outline-none border-2 border-white">완료</button>
      <div className="text-red-600">{verifyError}</div>
      {/* {isValid && <div className="text-green-600">인증이 완료되었습니다</div>}<br /> */}<br />
      <span className="absolute ml-4 left-50 top-50 text-white mt-5 text-2xl font-bold">비밀번호</span>
      <input name="password" type="password" value={password} placeholder="8자리 이상, 특수문자 포함" onChange={handlePasswordChange} className="bg-black text-white w-1/2 px-80 py-6 rounded-full focus:outline-none border-2 border-white placeholder-gray-300 placeholder-shown:font-bold" /><br /> {/* placeholder:8자리 이상, 특수문자 포함 */}
      <div className="text-red-600">{passwordError}</div>
      {password!=='' && isValid && <div className="text-green-600">올바른 비밀번호 형식입니다.</div>}<br />
      <span className="absolute ml-4 left-50 top-70 text-white mt-5 text-2xl font-bold">비밀번호 확인</span>
      <input name="passwordConfirm" type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} className="bg-black text-white w-1/2 px-80 py-6 rounded-full focus:outline-none border-2 border-white"/><br />
      <div className="text-red-600">{passwordConfirmError}</div>
      {passwordConfirm!=='' && isValid && <div className="text-green-600">비밀번호가 일치합니다.</div>}<br />
      <div className="mb-7" />
      <span className="absolute ml-4 left-50 top-70 text-white mt-5 text-2xl font-bold">이름</span>
      <input name="name" type="text" placeholder="관리자 01" className="bg-black text-white px-80 py-6 w-1/2 rounded-full focus:outline-none border-2 border-white placeholder-gray-300 placeholder-shown:font-bold" />
      <div className="text-red-600">{nameError}</div>
      <div className="mb-20" />
      <Link to="/Login"><button type="button" disabled={!isValid} className="bg-white text-black px-80 py-6 rounded-full text-4xl font-bold">완료</button></Link>
      <div className="mb-20" />
      </div>
      </div>
    </div>
    
  );
}
