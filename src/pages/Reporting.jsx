// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import back from '../img/back_icon.png';

// const RadioOptions = ({ options, selectedOption, setSelectedOption, onOtherSelected }) => {
//   return (
//     <>
//       {options.map((option, idx) => (
//         <label key={idx} className="flex items-center mb-2">
//           <input
//             type="radio"
//             className="form-radio h-4 w-4 text-red-600"
//             name="reportReason"
//             value={option}
//             checked={selectedOption === option}
//             onChange={(e) => {
//               setSelectedOption(e.target.value);
//               onOtherSelected(e.target.value === "기타 (직접 작성하기)");
//             }}
//           />
//           <span className="ml-2">{option}</span>
//         </label>
//       ))}
//     </>
//   );
// };

// const ReportingPage = () => {
//   let navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isOtherSelected, setIsOtherSelected] = useState(false);
//   const [otherText, setOtherText] = useState('');
//   const [showModal, setShowModal] = useState(false); // 모달 표시 상태
//   const [bookmarkId, setBookmarkId] = useState(null); // 북마크 ID 상태 추가

//   useEffect(() => {
//     const fetchBookmarkId = async () => {
//       try {
//         const response = await axios.get('/bookmarks?page=1');
//         const firstBookmarkId = response.data.data.content[0].id;
//         setBookmarkId(firstBookmarkId);
//       } catch (error) {
//         console.error('Error fetching bookmark ID:', error);
//       }
//     };

//     fetchBookmarkId();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedOption) {
//       alert('신고 사유를 선택해주세요.');
//       return;
//     }

//     // if (!bookmarkId) {
//     //   console.error('Bookmark ID is not available.');
//     //   return;
//     // }

//     // const memberId = 1; // 예시 값
//     const reportIndex = reportOptions.indexOf(selectedOption) + 1;
//     const reportData = {
//       // memberId,
//       bookMarkId: bookmarkId,
//       report: reportIndex,
//       reason: isOtherSelected ? otherText : selectedOption
//     };

//   //   try {
//   //     const response = await axios.post('/bookmarks/reports', reportData);
//   //     console.log('Response:', response.data);
//   //     setShowModal(true);
//   //     // 모달 추가
//   //     if (response.data.reported) {
//   //       navigate('/allbookmarks'); // 신고된 페이지로 이동
//   //     }
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //     alert('신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
//   //   }
//   // };
//   try {
//     const accessToken = localStorage.getItem('accessToken'); // 저장된 accessToken 가져오기
//     console.log(accessToken);
//     const response = await axios.post('/bookmarks/reports', reportData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}` // 헤더에 accessToken 포함
//       }
//     });
//     console.log('Response:', response.data);
//     setShowModal(true);

//     if (response.data.reported) {
//       navigate('/allbookmarks'); // 신고된 페이지로 이동
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
//   }
// };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     navigate('/allbookmarks');
//   };

//   const reportOptions = [
//     "스팸/홍보/도배글이에요",
//     "혐오발언을 기재했어요",
//     "부적절한 내용입니다",
//     "기타 (직접 작성하기)"
//   ];

//   return (
//     <div className="flex flex-col h-screen bg-white text-black">
//       <nav className="flex items-center justify-between p-6 border-b border-gray-200 h-20">
//         <button onClick={() => navigate(-1)} className="text-black">
//           <img src={back} alt="아이콘" className="mx-auto my-3 h-8 back-icon" />
//         </button>

//         <h1 className="text-center font-bold text-lg">신고하기</h1>
//         <div style={{ width: "24px" }}></div>
//       </nav>

//       <div className="flex-grow flex flex-col items-center px-4 py-2">
//         <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
//           <fieldset className="mb-4">
//             <legend className="text-lg mt-4 mb-8 font-bold">
//               해당 게시물을 신고하는 이유를 알려주세요
//             </legend>
//             <RadioOptions
//               options={reportOptions}
//               selectedOption={selectedOption}
//               setSelectedOption={setSelectedOption}
//               onOtherSelected={setIsOtherSelected}
//             />
//             {isOtherSelected && (
//               <textarea
//                 rows="4"
//                 placeholder="내용을 입력해주세요"
//                 className="mt-2 p-2 border rounded w-full"
//                 value={otherText}
//                 onChange={(e) => setOtherText(e.target.value)}
//               />
//             )}
//           </fieldset>
//           <button
//             type="submit"
//             className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
//           >
//             제출하기
//           </button>
//         </form>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center">
//           <div className="text-white bg-transparent p-4 rounded-lg text-center">
//             <p className="text-lg pb-4">신고가 정상적으로 제출되었어요.</p>
//             <button
//               onClick={handleCloseModal}
//               className="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
//             >
//               확인
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportingPage;






















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import back from '../img/back_icon.png';

// const RadioOptions = ({ options, selectedOption, setSelectedOption, onOtherSelected }) => {
//   return (
//     <>
//       {options.map((option, idx) => (
//         <label key={idx} className="flex items-center mb-2">
//           <input
//             type="radio"
//             className="form-radio h-4 w-4 text-red-600"
//             name="reportReason"
//             value={option}
//             checked={selectedOption === option}
//             onChange={(e) => {
//               setSelectedOption(e.target.value);
//               onOtherSelected(e.target.value === "기타 (직접 작성하기)");
//             }}
//           />
//           <span className="ml-2">{option}</span>
//         </label>
//       ))}
//     </>
//   );
// };

// const ReportingPage = () => {
//   let navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [isOtherSelected, setIsOtherSelected] = useState(false);
//   const [otherText, setOtherText] = useState('');
//   const [showModal, setShowModal] = useState(false); // 모달 표시 상태
//   const [bookmarkId, setBookmarkId] = useState(null); // 북마크 ID 상태 추가

//   useEffect(() => {
//     const fetchBookmarkId = async () => {
//       try {
//         const response = await axios.get('/bookmarks?page=1');
//         const firstBookmarkId = response.data.data.content[0].id;
//         setBookmarkId(firstBookmarkId);
//       } catch (error) {
//         console.error('Error fetching bookmark ID:', error);
//       }
//     };

//     fetchBookmarkId();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!selectedOption) {
//       alert('신고 사유를 선택해주세요.');
//       return;
//     }
  
//     const accessToken = localStorage.getItem('accessToken'); // 저장된 accessToken 가져오기
//     if (!accessToken) {
//       alert('로그인이 필요합니다.');
//       navigate('/login'); // 로그인 페이지로 리디렉션
//       return;
//     }
  
//     const reportIndex = reportOptions.indexOf(selectedOption) + 1;
//     const reportData = {
//       bookMarkId: bookmarkId,
//       report: reportIndex,
//       reason: isOtherSelected ? otherText : selectedOption
//     };
  
//     try {
//       const response = await axios.post('/bookmarks/reports', reportData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}` // 헤더에 accessToken 포함
//         }
//       });
  
//       console.log('Response:', response.data);
//       setShowModal(true);
  
//       if (response.data.reported) {
//         navigate('/allbookmarks'); // 신고된 페이지로 이동
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     navigate('/allbookmarks');
//   };

//   const reportOptions = [
//     "스팸/홍보/도배글이에요",
//     "혐오발언을 기재했어요",
//     "부적절한 내용입니다",
//     "기타 (직접 작성하기)"
//   ];

//   return (
//     <div className="flex flex-col h-screen bg-white text-black">
//       <nav className="flex items-center justify-between p-6 border-b border-gray-200 h-20">
//         <button onClick={() => navigate(-1)} className="text-black">
//           <img src={back} alt="아이콘" className="mx-auto my-3 h-8 back-icon" />
//         </button>

//         <h1 className="text-center font-bold text-lg">신고하기</h1>
//         <div style={{ width: "24px" }}></div>
//       </nav>

//       <div className="flex-grow flex flex-col items-center px-4 py-2">
//         <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
//           <fieldset className="mb-4">
//             <legend className="text-lg mt-4 mb-8 font-bold">
//               해당 게시물을 신고하는 이유를 알려주세요
//             </legend>
//             <RadioOptions
//               options={reportOptions}
//               selectedOption={selectedOption}
//               setSelectedOption={setSelectedOption}
//               onOtherSelected={setIsOtherSelected}
//             />
//             {isOtherSelected && (
//               <textarea
//                 rows="4"
//                 placeholder="내용을 입력해주세요"
//                 className="mt-2 p-2 border rounded w-full"
//                 value={otherText}
//                 onChange={(e) => setOtherText(e.target.value)}
//               />
//             )}
//           </fieldset>
//           <button
//             type="submit"
//             className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
//           >
//             제출하기
//           </button>
//         </form>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center">
//           <div className="text-white bg-transparent p-4 rounded-lg text-center">
//             <p className="text-lg pb-4">신고가 정상적으로 제출되었어요.</p>
//             <button
//               onClick={handleCloseModal}
//               className="bg-white text-black font-bold py-2 px-4 rounded focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
//             >
//               확인
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportingPage;













import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import back from '../img/back_icon.png';

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
  let location = useLocation();

  const [selectedOption, setSelectedOption] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const bookmarkId = location.state?.bookmarkId; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedOption) {
      alert('신고 사유를 선택해주세요.');
      return;
    }

    if (!bookmarkId) {
      console.error('Bookmark ID is not available.');
      return;
    }

    const memberId = 1; // 예시 값
    const reportIndex = reportOptions.indexOf(selectedOption) + 1;
    const reportData = {
      memberId,
      bookMarkId: bookmarkId,
      report: reportIndex,
      reason: isOtherSelected ? otherText : selectedOption
    };

    try {
      const response = await axios.post('/bookmarks/reports', reportData);
      console.log('Response:', response.data);
      setShowModal(true);
      if (response.data.reported) {
        navigate('/allbookmarks');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/allbookmarks');
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
          <img src={back} alt="아이콘" className="mx-auto my-3 h-8 back-icon" />
        </button>
        <h1 className="text-center font-bold text-lg">신고하기</h1>
        <div style={{ width: "24px" }}></div>
      </nav>

      <div className="flex-grow flex flex-col items-center px-4 py-2">
        <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
          <fieldset className="mb-4">
            <legend className="text-lg mt-4 mb-8 font-bold">
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
