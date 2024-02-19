import React from 'react'
import { useState, useEffect } from 'react'
import logo from '../img/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '../img/arrow.png'
import '../css/Signup.css'
import axios from 'axios'
import ResetPassword from './ResetPassword'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [univName, setUnivName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [validEmailMessage, setValidEmailMessage] = useState('')
  const [VerifyErrorMessage, setVerifyErrorMessage] = useState('')

  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  // 인증 메일 전송
  const handleSendVerification = async () => {
    try {
      const requestBody = {
        univName: univName,
        email: email,
        univ_check: false,
      }

      const response = await axios.post('/member/sendemail', requestBody)
      console.log(response.data)
    } catch (error) {
      console.error('오류:', error)
    }
  }

  // 인증 코드 체크
  const handleVerifyCode = async () => {
    try {
      const requestBody = {
        univName: univName,
        email: email,
        code: inputValue,
      }
      const response = await axios.post('/member/checkemail', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.data.isSuccess) {
        setVerifyErrorMessage('인증이 완료되었습니다')
      } else {
        setVerifyErrorMessage('인증번호가 일치하지 않습니다')
      }
      console.log(response.data)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setVerifyErrorMessage('인증번호가 일치하지 않습니다')
      } else if (error.response && error.response.status === 200) {
        setVerifyErrorMessage('인증이 완료되었습니다')
      }
      console.error('인증 코드 확인 중 오류:', error)
    }
  }

  // 회원가입
  const handleSignUp = async () => {
    try {
      const requestBody = {
        email: email,
        password: password,
        univName: univName,
        terms: [1],
      }

      const response = await axios.post('/member/signup', requestBody)
      console.log(response.data)
      navigate('/Login')
      //navigate("/Login", { state: { email: email } });
    } catch (error) {
      console.error('회원가입 중 오류:', error)
    }
  }

  const handleInputUniv = (e) => {
    const newUniv = e.target.value
    setUnivName(newUniv)
  }
  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '') // 숫자 이외의 문자 제거
    setInputValue(newValue)
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    validateEmail(newEmail)
  }
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    validatePassword(newPassword)
  }
  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value
    setPasswordConfirm(newPasswordConfirm)
    validatePasswordConfirm(newPasswordConfirm)
  }
  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[^@]+\.ac\.kr$/
    const isValid = emailRegex.test(input)
    setIsValid(isValid && passwordError === '' && passwordConfirmError === '')
  }
  const validatePassword = (input) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    const isValid = passwordRegex.test(input)
    setIsValid(
      isValid &&
        emailError === '' &&
        passwordConfirmError === '' &&
        passwordConfirm === input
    )
  }
  const validatePasswordConfirm = (input) => {
    const isValid = input === password
    setPasswordConfirmError(isValid ? '' : '비밀번호가 일치하지 않습니다')
    setIsValid(
      isValid && emailError === '' && passwordError === '' && password === input
    )
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center font-SUITE">
        <Link className="custom-arrow" to="/login">
          <img src={arrow} alt="arrow" />
        </Link>
        <div className="custom-logintitle">Sign up</div>
        <div className="mb-12" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-signupform1 border border-1 border-white rounded-3xl w-2/3 m-auto">
        <br />
        <div className="flex items-center justify-center">
          <img src={logo} width="100px" height="100px" alt="umark" />
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
            value={univName}
            onChange={handleInputUniv}
            className="custom-input3  bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white placeholder-white"
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
          <div
            className={`${
              VerifyErrorMessage &&
              VerifyErrorMessage.includes('인증이 완료되었습니다')
                ? 'text-green-600'
                : 'text-red-600'
            } ml-80`}
          >
            {VerifyErrorMessage}
          </div>
          <br />

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
          <br />
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
          {passwordConfirm !== '' && isValid ? (
            <div className="ml-80 text-green-600 paasswordcorrect">
              비밀번호가 일치합니다
            </div>
          ) : (
            <div className="ml-80 text-red-600">{passwordConfirmError}</div>
          )}
          <br />
          <button
            type="button"
            disabled={!isValid}
            onClick={handleSignUp}
            /* onClick={() => {
              handleSignUp();
              navigate("/Login", { state: { email: email } });
            }} */
            className="custom-endbutton2 bg-white text-black px-80 py-4 rounded-full font-bold"
          >
            완료
          </button>
          <div className="mb-10" />
        </div>
      </div>
      <br />
    </div>
  )
}
