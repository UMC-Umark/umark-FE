import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx";

export default function Agreement() {
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
      navigate("/signup");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div className="inline-block w-full">
        <Link to="/">
          <p className="px-5 py-2 rounded-3xl inline-block text-5xl mr-80">←</p>
        </Link>
        <h1 className="text-6xl font-bold text-center inline-block ml-80 w-1/2">
          sign up
        </h1>
        <br />
        <br />
      </div>
      <br />
      <hr />
      <div className="mb-20" />
      <div className="border border-1 border-white rounded-3xl w-2/3 m-auto h-1/2">
        <br />
        <div className="flex items-center justify-center">
          <img src={logo} alt="umark" />
        </div>
        <div className="inline rounded-lg border-white">
          <br />
          <label className="text-center text-4xl">
            <p className="font-bold">umark</p>
            <div className="mb-2" />
            <p>서비스 약관에 동의해 주세요</p>
          </label>
          <div className="mb-20" />
          <div className="text-center relative">
            <input
              type="checkbox"
              id="agree_check_used"
              name="termsAgreed"
              required
              checked={agreements.termsAgreed}
              onChange={handleAgreementChange}
              className="w-7 h-7"
            />

            <label htmlFor="agree_check_used" className="text-3xl ml-2">
              [필수]umark 계정 약관
            </label>
            <div className="mb-10" />
            <input
              type="checkbox"
              id="agree_check_info"
              name="personalInfoAgreed"
              required
              checked={agreements.personalInfoAgreed}
              onChange={handleAgreementChange}
              className="w-7 h-7"
            />
            <label htmlFor="agree_check_info" className="text-3xl ml-2">
              [필수]개인정보 수집 및 이용 동의
            </label>
            <div className="mb-10" />
            <div className="flex items-center justify-center">
              <hr className="w-2/3" />
            </div>
            <div className="mb-10" />
            <input
              type="checkbox"
              id="agree_check_all"
              name="agree_check_all"
              checked={allAgreed}
              onChange={handleAllAgreementChange}
              className="w-7 h-7"
            />
            <label htmlFor="agree_check_all" className="text-3xl ml-2">
              모두 동의하기
            </label>
            <div className="mb-40" />
            <button
              type="button"
              id="open"
              className={`bg-white text-black px-60 py-4 rounded-full font-bold text-4xl
              }`}
              onClick={handleNextButtonClick}
            >
              다음
            </button>
            <div className="mb-40" />
            <div>{modalVisible && <Modal closeModal={closeModal} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
