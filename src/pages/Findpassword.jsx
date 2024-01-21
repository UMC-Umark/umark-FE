import React from 'react'
import { useState } from "react";
import logo from "../img/logo.png";
import {Link, useNavigate} from 'react-router-dom';
import Check from "./Check";

export default function Findpassword() {
    const [email, setEmail]=useState('');
    const [emailError, setEmailError]=useState('');
    const [isValid, setIsValid]=useState(false);
    const [validEmailMessage, setValidEmailMessage] = useState('');
    const [verifyError, setVerifyError]=useState('');
    const [nameError, setNameError]=useState('');

    const handleEmailChange = (e) => {
        const newEmail=e.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };
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
        setIsValid(isValid);

    }
    const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleAgreementChange = (event) => {
    const { name, checked } = event.target;

    setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
    const allChecked = Object.values({ ...agreements, [name]: checked }).every(
      (value) => value === true
    );
    setAllAgreed(allChecked);
  };

  const handleAllAgreementChange = (event) => {
    const { checked } = event.target;
    setAgreements((prevAgreements) =>
      Object.keys(prevAgreements).reduce(
        (newAgreements, agreementKey) => ({
          ...newAgreements,
          [agreementKey]: checked,
        }),
        {}
      )
    );
    setAllAgreed(checked);
  };

  const handleNextButtonClick = () => {
    if (!allAgreed) {
      setModalVisible(true);
    } else {
      navigate('/Found');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };


    
  return (
    <div>
      <div className="inline-block w-full">
      <Link to="/Login"><p className="px-5 py-2 rounded-full inline-block text-5xl mr-80">←</p></Link>
      <h1 className="text-6xl font-bold text-center inline-block ml-80 w-1/2">password</h1><br /><br />
      </div>
      <br />
      <hr />
      <br />
      <br />
      <div className="flex items-center justify-center ">
      <div className="mb-60" />
        <img src={logo} alt="umark" />
      </div>
      <br /><br />
      <p className="text-center text-4xl">비밀번호를 찾고자하는 이메일과 이름을 입력해주세요</p><br />
      <div className="text-center inline-block w-full relative">
      <span className="absolute ml-4 left-50 top-2 text-white mt-3 font-bold text-2xl">이메일</span>
      <input name="email" placeholder="name@duksung.ac.kr" value={email} onChange={handleEmailChange} className="bg-black text-white px-80 py-6 rounded-full text-left focus:outline-none border-2 border-white placeholder-gray-300"/>
      <div className="text-red-600">{emailError}</div>
      <br />
      <span className="absolute ml-4 left-50 top-70 text-white mt-5 font-bold text-2xl">이름</span>
      <input name="name" type="text" className="bg-black text-white px-80 py-6 rounded-full focus:outline-none border-2 border-white placeholder-gray-300"/>
      <div className="text-red-600">{nameError}</div>
      <div className="mb-20" />
        <button type="button" disabled={!isValid} className="bg-white text-black px-40 py-5 rounded-full text-3xl font-bold" onClick={handleNextButtonClick}>조회</button>
        <div className="mb-40" />
            <div>
              {modalVisible && <Check closeModal={closeModal} />}
            </div>
      </div>
    </div>
    
  );
}
