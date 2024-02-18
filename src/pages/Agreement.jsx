import React, { useState, useEffect } from "react";
import logo from "../img/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import arrow from "../img/arrow.png";
import "../css/Agree.css";
import axios from "axios";
import "../css/Checkbox.css";

export default function Agreement() {
  const [isCheck1, setCheck1] = useState(false); // 토글을 닫아두기 위해 초기값을 false로 설정
  const [isCheck2, setCheck2] = useState(false);

  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [agreementsData, setAgreementsData] = useState(null);

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

  useEffect(() => {
    async function fetchAgreements() {
      try {
        const response = await axios.get("/terms");
        console.log(response.data);
        /* 
        if (response.data.isSuccess) {
          setAgreementsData(response.data.data.terms); // 약관 정보를 가져와 state 업데이트
          const initialAgreements = response.data.data.terms.map((term) => ({
            ...term,
            agreed: false,
          }));
          setAgreements(initialAgreements); */
      } catch (error) {
        console.error("약관 정보를 불러오는 중 오류 발생:", error);
      }
    }

    fetchAgreements(); // 약관 정보를 가져오는 함수 호출
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출하도록 빈 배열을 전달

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center font-SUITE">
        <Link className="custom-arrow" to="/Login">
          <img src={arrow} alt="arrow" />
        </Link>
        <h1 className="custom-signuptitle text-center inline-block w-1/2">
          sign up
        </h1>
        <div className="mb-12" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-agreeform border border-1 border-white rounded-3xl w-2/3 m-auto">
        <br />
        <div className="flex items-center justify-center pt-8 pb-4">
          <img src={logo} width="25px" height="25px" alt="umark" />
        </div>
        <div className="inline rounded-lg border-white">
          <br />
          <label className="text-center">
            <p className="custom-agreee font-bold">umark</p>
            <div className="mb-2" />
            <p className="custom-agreee">서비스 약관에 동의해 주세요</p>
          </label>
          <div className="mb-8" />
          <div className="text-center relative">
            <div className="custom-check">
              <input
                type="checkbox"
                id="agree_check_used"
                name="termsAgreed"
                required
                checked={agreements.termsAgreed}
                onChange={handleAgreementChange}
                className="w-5 h-5"
              />

              <label htmlFor="agree_check_used" className="custom-text pb-4">
              &nbsp;&nbsp;[필수] umark 계정 약관
              </label>
              <button
                className="custom-detailbutton ml-3 text-gray-300"
                onClick={() => {
                  setCheck1((e) => !e); // setCheck로 state값을 변경
                }}
              >
                {isCheck1 ? "본문 닫기" : "본문 보기"}
              </button>
              {isCheck1 && (
                <p className="custom-details p-8 border border-1 w-1/2 flex justify-center ml-60 border-gray-300 mb-4 ">
                  umark 약관 1항:~
                </p>
              )}
              {agreementsData && (
                <>
                  {agreementsData.map((term) => (
                    <div key={term.id} className="text-left mb-4">
                      <input
                        type="checkbox"
                        id={term.id}
                        name={term.id.toString()}
                        checked={
                          agreements.find(
                            (agreement) => agreement.id === term.id
                          )?.agreed || false
                        }
                        onChange={handleAgreementChange}
                        className="mr-2"
                      />
                      <label htmlFor={term.id}>{term.title}</label>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="custom-check">
              <input
                type="checkbox"
                id="agree_check_info"
                name="personalInfoAgreed"
                required
                checked={agreements.personalInfoAgreed}
                onChange={handleAgreementChange}
                className="w-5 h-5"
              />
              <label htmlFor="agree_check_info" className="custom-text ml-2 ">
              &nbsp;&nbsp;[필수] 개인정보 수집 및 이용 동의
              </label>
              <button
                className="custom-detailbutton ml-3 text-gray-300"
                onClick={() => {
                  setCheck2((e) => !e); // setCheck로 state값을 변경
                }}
              >
                {isCheck2 ? "본문 닫기" : "본문 보기"}
              </button>
              {isCheck2 && (
                <p className="custom-details p-8 border border-1 w-1/2 flex justify-center ml-60 border-gray-300 mt-3">
                  개인정보약관 1항:~
                </p>
              )}
            </div>
            <div className="mb-5" />
            <div className="flex items-center justify-center">
              <hr className="custom-ho" />
            </div>
            <div className="mb-2" />
            <div className="custom-check">
              <input
                type="checkbox"
                id="agree_check_all"
                name="agree_check_all"
                checked={allAgreed}
                onChange={handleAllAgreementChange}
                className="w-5 h-5"
              />
              <label
                htmlFor="agree_check_all"
                className="custom-text text-2xl ml-2 mt-3"
              >
                &nbsp;&nbsp;모두 동의하기
              </label>
            </div>
            <div className="mb-20" />
            <button
              type="button"
              id="open"
              className={`custom-nextbutton1 bg-white text-black px-60 py-3 rounded-full font-bold
              }`}
              onClick={handleNextButtonClick}
            >
              다음
            </button>
            <div className="mb-10" />
            <div>{modalVisible && <Modal closeModal={closeModal} />}</div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
