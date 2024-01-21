import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const RadioOptions = ({ options, selectedOption, setSelectedOption, onOtherSelected }) => {
  return (
    <>
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center mb-2">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-red-600"
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
  const [selectedOption, setSelectedOption] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOption); // 제출     로직에 따라 처리
    // navigate('/some-path'); // 제출 후 리디렉션할 경로
  };

  const reportOptions = [
    "스팸/홍보/도배글이에요",
    "혐오발언을 기재했어요",
    "부적절한 내용입니다",
    "기타 (직접 작성하기)"
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <nav className="flex items-center justify-between p-6 border-b border-gray-200 h-20">
        <button onClick={() => navigate(-1)} className="text-black">
          {/* 아이콘 */}
          <span className="material-icons">back</span>
        </button>
        <h1 className="text-center font-bold text-lg">신고하기</h1>
        <div style={{ width: '24px' }}></div> 
      </nav>

      <div className="flex-grow flex flex-col items-center  px-4 py-2">
        <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
          <fieldset className="mb-4">
            <legend className="text-lg mt-4 mb-8 font-bold">해당 게시물을 신고하는 이유를 알려주세요</legend>
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
              />
            )}
          </fieldset>
          <button type="submit" className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportingPage;
