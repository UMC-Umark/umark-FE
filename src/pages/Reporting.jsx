
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import back from '../img/back_icon.png';
import './Reporting.css';

const RadioOptions = ({ options, selectedOption, setSelectedOption, onOtherSelected }) => {
  return (
    <>
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center mb-2">
          <input
            type="radio"
            className="custom-radio"
            name="reportReason"
            value={option}
            checked={selectedOption === option}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              onOtherSelected(e.target.value === "기타 (직접 작성하기)");
            }}
          />
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </>
  );
};

const ReportingPage = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [selectedOption, setSelectedOption] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const bookmarkId = location.state?.bookmarkId; 

  const reportOptions = [
    "스팸/홍보/도배글이에요",
    "혐오발언을 기재했어요",
    "부적절한 내용입니다",
    "기타 (직접 작성하기)"
  ];

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('/member/refresh', { refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      setAccessToken(newAccessToken);
      console.log('Refresh token successful');
      return newAccessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // navigate('/login');
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting report...');
    if (!selectedOption) {
      console.log('No report reason selected');
      alert('신고 사유를 선택해주세요.');
      return;
    }

    // if (!bookmarkId) {
    //   console.error('Bookmark ID is not available.');
    //   return;
    // }

    const token = accessToken;
    if (!token) {
      console.log('No access token available');
      alert('로그인이 필요합니다.');
      // navigate('/login');
      return;
    }

    const reportData = {
      bookMarkId: bookmarkId,
      report: reportOptions.indexOf(selectedOption) + 1,
      reason: isOtherSelected ? otherText : selectedOption
    };

    try {
      const response = await axios.post('/bookmarks/reports', reportData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Report submission successful:', response.data);
      setShowModal(true);
      if (response.data.reported) {
        navigate('/allbookmarks');
      }
    } catch (error) {
      console.error('Report submission error:', error);
      if (error.response && error.response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          // 재시도하기 전에 토큰을 업데이트하고 재시도
          setAccessToken(newToken);
          await handleSubmit(event); // Retry the submit with the new token
        }
      } else {
        alert('신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/allbookmarks');
  };



  
  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <nav className="flex items-center justify-between p-6 border-b border-gray-200 h-20">
        <button onClick={() => navigate(-1)} className="text-black">
          <img src={back} alt="아이콘" className="mx-auto my-3 h-8 back-icon" />
        </button>
        <h1 className="text-center font-bold text-xl">신고하기</h1>
        <div style={{ width: "24px" }}></div>
      </nav>

      <div className="flex-grow flex flex-col items-center px-4 py-2">
        <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
          <fieldset className="mb-4 mt-6">
            <legend className="text-lg mt-8 mb-8 font-bold">
              해당 게시물을 신고하는 이유를 알려주세요
            </legend>
            <RadioOptions
              options={reportOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onOtherSelected={setIsOtherSelected}
            />
            {isOtherSelected && (
              <textarea
                rows="4"
                placeholder="내용을 입력해주세요"
                className="mt-2 p-2 border rounded w-full"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            )}
          </fieldset>
          <button
            type="submit"
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            제출하기
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center">
          <div className="text-white bg-transparent p-4 rounded-lg text-center">
            <p className="text-lg pb-4">신고가 정상적으로 제출되었어요.</p>
            <button
              onClick={handleCloseModal}
              className="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingPage;
