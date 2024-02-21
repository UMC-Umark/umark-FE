import React, { useState, useEffect } from "react";
import logo from "../img/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import DetailModal1 from "../components/DetailModal1";
import DetailModal2 from "../components/DetailModal2";
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
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
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

  const handleDetail1ButtonClick = () => {
    setModal1Visible(true);
  };
  const handleDetail2ButtonClick = () => {
    setModal2Visible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const closeDetailModal1 = () => {
    setModal1Visible(false);
  };
  const closeDetailModal2 = () => {
    setModal2Visible(false);
  };
  useEffect(() => {
    async function fetchAgreements() {
      try {
        const response = await axios.get("/terms", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("약관 정보를 불러오는 중 오류 발생:", error);
      }
    }

    fetchAgreements(); // 약관 정보를 가져오는 함수 호출
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출하도록 빈 배열을 전달

  const handleToggleDetail1Modal = () => {
    setModal1Visible((prevState) => !prevState);
  };
  const handleToggleDetail2Modal = () => {
    setModal2Visible((prevState) => !prevState);
  };
  const handleToggle1 = () => {
    setCheck1((prevState) => !prevState);
  };

  const handleToggle2 = () => {
    setCheck2((prevState) => !prevState);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center font-SUITE">
        <Link className="custom-arrow" to="/login">
          <img src={arrow} alt="arrow" />
        </Link>
        <div className="custom-logintitle">sign up</div>
        <div className="mb-12" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-agreeform border border-1 border-white rounded-3xl w-2/3 m-auto">
        <br />
        <div className="flex items-center justify-center pt-8 pb-4">
          <img src={logo} width="120px" height="120px" alt="umark" />
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
                onClick={handleToggle1}
              >
                {isCheck1 ? "본문 닫기" : "본문 보기"}
              </button>
              {isCheck1 && (
                <p className="custom-details p-8 border border-1 w-1/2 flex justify-center ml-80 border-gray-300 mb-4 ">
                  1. 서비스 제공자 이 서비스(이하 "서비스")는 [회사명] (이하
                  "회사")에 의해 제공됩니다. 2. 약관의 적용 본 약관은 서비스
                  이용과 관련하여 회사와 이용자 사이의 권리와 의무를 규정합니다.
                  서비스를 이용하고자 하는 모든 이용자는 본 약관의 내용에
                  동의해야 합니다. 3. 계정 등록 서비스를 이용하려는 이용자는
                  회사가 제공하는 방법에 따라 계정을 등록하여야 합니다. 계정
                  등록 시 제공되는 정보는 정확하고 최신의 정보를 제공하여야
                  하며, 이에 대한 모든 책임은 이용자에게 있습니다. 4. 개인정보
                  보호 회사는 이용자의 개인정보를 보호하기 위해 최선을 다하며,
                  개인정보 처리에 관한 법령 및 규정을 준수합니다. 이용자의
                  개인정보 수집, 이용, 제공에 대한 자세한 내용은 개인정보
                  처리방침을 참조하십시오. 5. 서비스 이용 이용자는 서비스를
                  본래의 목적에 맞게 이용하여야 합니다. 서비스 이용 중 발생한
                  모든 활동에 대한 책임은 이용자에게 있으며, 서비스 이용과
                  관련하여 법령 및 규정을 준수하여야 합니다. 6. 서비스 제공의
                  중지 및 변경 회사는 서비스의 제공을 중지하거나 변경할 수
                  있으며, 이로 인해 발생하는 불편이나 손실에 대해서는 책임을
                  지지 않습니다. 이용자에게 제공되는 서비스의 종류 및 내용은
                  회사의 판단에 따라 변동될 수 있습니다. 7. 서비스 이용 제한
                  회사는 다음 각 호에 해당하는 경우 이용자의 서비스 이용을
                  제한할 수 있습니다. 다른 이용자에게 피해를 줄 우려가 있는 경우
                  서비스 이용 목적에 부합하지 않는 행위를 하는 경우 법령 및
                  약관을 위반하는 행위를 하는 경우 8. 책임의 한계 회사는 서비스
                  이용과 관련하여 발생한 손실이나 피해에 대해 일체의 책임을 지지
                  않습니다. 9. 약관의 변경 회사는 필요 시 본 약관을 변경할 수
                  있으며, 변경된 내용은 회사의 웹사이트나 애플리케이션을 통해
                  공지됩니다. 변경된 약관은 공지 후 즉시 효력이 발생합니다. 10.
                  준거법 및 관할법원 본 약관의 해석 및 적용에 관한 모든 분쟁은
                  대한민국 법령에 따라 해결되며, 관련 법원은
                  서울중앙지방법원으로 합니다.
                </p>
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
                onClick={handleToggle2}
              >
                {isCheck2 ? "본문 닫기" : "본문 보기"}
              </button>
              {isCheck2 && (
                <p className="custom-details p-8 border border-1 w-1/2 flex justify-center ml-80 border-gray-300 mt-3">
                  제1조(목적) : umark(이하 '회사'라고 함)는 회사가 제공하고자
                  하는 서비스(이하 '회사 서비스')를 이용하는 유마커(이하
                  '이용자' 또는 '개인')의 정보(이하 '개인정보')를 보호하기 위해,
                  개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한
                  법률(이하 '정보통신망법') 등 관련 법령을 준수하고, 서비스
                  이용자의 개인정보 보호 관련한 고충을 신속하고 원활하게 처리할
                  수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 '본
                  방침')을 수립합니다. 제2조(개인정보 처리의 원칙) : 개인정보
                  관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할
                  수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해
                  제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해
                  적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를
                  사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.
                  제3조(본 방침의 공개) : 회사는 이용자가 언제든지 쉽게 본
                  방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의
                  연결화면을 통해 본 방침을 공개하고 있습니다. 제4조(본 방침의
                  변경) : 1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는
                  정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수
                  있습니다. 2. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음
                  각 호 하나 이상의 방법으로 공지합니다. &nbsp; 1. 회사가
                  운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의
                  창을 통하여 공지하는 방법 &nbsp; 2. 서면•모사전송•전자우편
                  또는 이와 비슷한 방법으로 이용자에게 공지하는 방법 3. 회사는
                  제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에
                  공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는
                  최소 30일 전에 공지합니다. 제5조(회원 가입을 위한 정보) :
                  회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과
                  같은 정보를 수집합니다. 1. 필수 수집 정보: 이메일 주소 및
                  비밀번호 2. 선택 수집 정보: 학교명 제6조(본인 인증을 위한
                  정보) : 회사는 이용자의 본인인증을 위하여 다음과 같은 정보를
                  수집합니다. 1. 필수 수집 정보: 이메일 주소 제7조(서비스 이용
                  및 부정 이용 확인을 위한 정보) : 회사는 이용자의 서비스 이용에
                  따른 통계•분석 및 부정이용의 확인•분석을 위하여 다음과 같은
                  정보를 수집합니다.(부정이용이란 회원탈퇴 후 재가입, 상품구매
                  후 구매취소 등을 반복적으로 행하는 등 회사가 제공하는
                  할인쿠폰, 이벤트 혜택 등의 경제상 이익을 불•편법적으로
                  수취하는 행위, 이용약관 등에서 금지하고 있는 행위, 명의도용
                  등의 불•편법행위 등을 말합니다.) &nbsp; 1. 필수 수집 정보:
                  서비스 이용기록 및 쿠키 제8조(개인정보 수집 방법) : 회사는
                  다음과 같은 방법으로 이용자의 개인정보를 수집합니다. 1.
                  이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식 2.
                  어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해
                  이용자가 자신의 개인정보를 입력하는 방식 3. 이용자가 회사가
                  발송한 이메일을 수신받아 개인정보를 입력하는 방식
                  제9조(개인정보의 이용) 회사는 개인정보를 다음 각 호의 경우에
                  이용합니다. 1. 공지사항의 전달 등 회사운영에 필요한 경우 2.
                  이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스
                  개선을 위한 경우 3. 회사의 서비스를 제공하기 위한 경우 4. 법령
                  및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용
                  행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한
                  방지 및 제재를 위한 경우 제10조(개인정보의 보유 및 이용기간) :
                  1. 회사는 이용자의 개인정보에 대해 개인정보의 수집•이용 목적
                  달성을 위한 기간 동안 개인정보를 보유 및 이용합니다. 2.
                  전항에도 불구하고 회사는 내부 방침에 의해 서비스
                  부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴
                  시점으로부터 최대 1년간 보관합니다. 제11조(법령에 따른
                  개인정보의 보유 및 이용기간) : 회사는 관계법령에 따라 다음과
                  같이 개인정보를 보유 및 이용합니다. 1. 전자상거래 등에서의
                  소비자보호에 관한 법률에 따른 보유정보 및 보유기간 &nbsp; 1.
                  계약 또는 청약철회 등에 관한 기록:5년 &nbsp; 2. 대금결제 및
                  재화 등의 공급에 관한 기록:5년 &nbsp; 3. 소비자의 불만 또는
                  분쟁처리에 관한 기록:3년 &nbsp; 4. 표시 광고에 관한 기록:6개월
                  2. 통신비밀보호법에 따른 보유정보 및 보유기간 &nbsp; 1.
                  웹사이트 로그 기록 자료:3개월 3. 전자금융거래법에 따른
                  보유정보 및 보유기간 &nbsp; 1. 전자금융거래에 관한 기록:5년 4.
                  위치정보의 보호 및 이용 등에 관한 법률 &nbsp; 1.
                  개인위치정보에 관한 기록:6개월 제12조(개인정보의 파기원칙) :
                  회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성,
                  보유•이용기간의 경과 등 개인정보가 필요하지 않을 경우에는 해당
                  정보를 지체 없이 파기합니다. 제13조(개인정보파기절차) : 1.
                  이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이
                  달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부
                  방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및
                  이용기간 참조) 일정 기간 저장된 후 파기 되어집니다. 2. 회사는
                  파기 사유가 발생한 개인정보를 개인정보보호 책임자의 승인절차를
                  거쳐 파기합니다. 제14조(개인정보파기방법) : 회사는 전자적
                  파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적
                  방법을 사용하여 삭제하며, 종이로 출력된 개인정보는 분쇄기로
                  분쇄하거나 소각 등을 통하여 파기합니다. &nbsp; 제16조(개인정보
                  자동 수집 장치의 설치•운영 및 거부에 관한 사항) : 1. 회사는
                  이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를
                  저장하고 수시로 불러오는 개인정보 자동 수집장치(이하 '쿠키')를
                  사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가
                  이용자의 웹브라우저(PC 및 모바일을 포함)에게 보내는 소량의
                  정보이며 이용자의 저장공간에 저장되기도 합니다. 2. 이용자는
                  쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는
                  웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나,
                  쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의
                  저장을 거부할 수도 있습니다. 3. 다만, 쿠키의 저장을 거부할
                  경우에는 로그인이 필요한 회사의 일부 서비스는 이용자에
                  어려움이 있을 수 있습니다. 제17조(쿠키 설치 허용 지정 방법) :
                  웹브라우저 옵션 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을
                  할 수 있습니다. &nbsp; 1. Edge:웹브라우저 우측 상단의 설정
                  메뉴 - 쿠키 및 사이트 권한 - 쿠키 및 사이트 데이터 관리 및
                  삭제 &nbsp; 2. Chrome:웹브라우저 우측 상단의 설정 메뉴 -
                  개인정보 및 보안 - 쿠키 및 기타 사이트 데이터 &nbsp; 3.
                  Whale:웹브라우저 우측 상단의 설정 메뉴 - 개인정보 보호 - 쿠키
                  및 기타 사이트 데이터
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
