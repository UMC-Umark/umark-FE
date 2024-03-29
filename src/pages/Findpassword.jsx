// FindPassword.jsx
import React from 'react'
import { useState } from 'react'
import logo from '../img/logo.webp'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import arrow from '../img/arrow.png'
import '../css/Password.css'
import axios from 'axios'

export default function Findpassword() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [univName, setUnivName] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [validEmailMessage, setValidEmailMessage] = useState('')
  const [verifyError, setVerifyError] = useState('')
  const [nameError, setNameError] = useState('')
  const [VerifyErrorMessage, setVerifyErrorMessage] = useState('')
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const location = useLocation()

  // 인증 메일 전송
  const handleSendVerification = async () => {
    try {
      const requestBody = {
        email: email,
        univName: univName,
      }

      const response = await axios.post('/member/sendemail', requestBody)
      console.log(response.data)
    } catch (error) {
      console.error('메일 인증 전송 중 오류:', error)
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
      setIsVerificationCompleted(true)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setVerifyErrorMessage('인증번호가 일치하지 않습니다')
      } else if (error.response && error.response.status === 200) {
        setVerifyErrorMessage('인증이 완료되었습니다')
      }
      console.error('인증 코드 확인 중 오류:', error)
    }
  }

  const isVerificationButtonEnabled = !isVerificationCompleted

  const handleInputUniv = (e) => {
    const newUniv = e.target.value
    setUnivName(newUniv)
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    validateEmail(newEmail)
  }
  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '') // 숫자 이외의 문자 제거
    setInputValue(newValue)
  }

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[^@]+\.ac\.kr$/
    const isValid = emailRegex.test(input)
    if (!isValid) {
      setEmailError('올바른 이메일 형식이 아닙니다.')
    } else {
      setEmailError('')
    }
    setIsValid(isValid)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center">
        <Link className="custom-arrow" to="/Login">
          <img src={arrow} alt="arrow" />
        </Link>
        <h1 className="custom-findtitle text-center inline-block w-1/2 font-SUITE">
          비밀번호 찾기
        </h1>
        <div className="mb-5" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-findform1 border border-1 border-white rounded-3xl w-2/3 h-3.5/4 m-auto">
        <div className="custom-top flex items-center justify-center pt-8 pb-2">
          <div className="mb-40" />
          <img src={logo} width="100px" height="100px" alt="umark" />
        </div>
        <p className="custom-findinfo text-center">이메일을 인증해 주세요</p>
        <div className="mb-5" />
        <div className="custom-findform2 text-center inline-block relative">
          <span className="custom-findlabel1 absolute ml-6 left-50 top-70 text-white mt-3">
            학교명
          </span>
          <input
            name="univName"
            value={univName}
            onChange={handleInputUniv}
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;정확한 학교명을 적어주세요"
            className="custom-findinput1 bg-black text-white px-60 py-3 rounded-full text-center focus:outline-none border border-1 border-white placeholder-white"
          />
          <br />
          <br />
          <span className="custom-findlabel1 absolute ml-6 left-50 top-70 text-white mt-3">
            이메일
          </span>
          <input
            name="email"
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@university.ac.kr"
            value={email}
            onChange={handleEmailChange}
            className="custom-findinput1 bg-black text-white px-60 py-3 rounded-full text-center focus:outline-none border border-1 border-white placeholder-white"
          />
          <br />
          <br />
          <button
            type="button"
            onClick={handleSendVerification}
            className="custom-sendbutton bg-white text-black w-1/6 px-8 py-3 rounded-full mr-4 font-bold"
          >
            인증번호 전송
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="custom-input2 bg-black text-white w-1/5 mr-4 px-20 py-3 rounded-full text-center focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <button
            onClick={handleVerifyCode}
            className={`custom-endbutton1 bg-black text-white w-1/7 px-10 py-3 rounded-full focus:outline-none border border-1 border-white ${
              isVerificationButtonEnabled ? '' : 'cursor-not-allowed'
            }`}
          >
            완료
          </button>
          <div
            className={`verifybutton ml-0 mr-0 mt-2 mb-2 ${
              VerifyErrorMessage &&
              VerifyErrorMessage.includes('인증이 완료되었습니다')
                ? 'text-green-600'
                : 'text-red-600'
            } `}
          >
            {VerifyErrorMessage}
          </div>
          <div className="custom-bottom mb-12" />
          <Link to={{ pathname: '/ResetPassword', state: { email: email } }}>
            <button
              type="button"
              disabled={!isValid}
              className="custom-nextbutton bg-white text-black px-60 py-3 rounded-full font-bold"
            >
              다음
            </button>
          </Link>
          <div className="bottomsizebox mb-28" />
        </div>
      </div>
      <br />
    </div>
  )
}
