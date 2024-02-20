// import React from "react";
// import { useState } from "react";
// import logo from "../img/logo.webp";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import arrow from "../img/arrow.png";
// import "../css/Password.css";
// import axios from "axios";
// import Signup from "./Signup";

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
//   const navigate = useNavigate();
//   const emailSignup = localStorage.getItem("email"); // 로컬 스토리지에서 이메일 값 가져오기

//   // 비밀번호 찾기-비밀번호 변경
//   const handleResetPassword = async () => {
//     try {
//       const requestBody = {
//         //emailSignup: emailSignup, //setEmail(response.data.email),
//         newPassword: newPassword,
//       };

//       const response = await axios.patch(
//         "/member/changepasswordbyemail",
//         requestBody,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response);
//       if (response.data.isSuccess) {
//         localStorage.setItem("password", newPassword);
//         navigate("/Login");
//         console.log(response.data);
//         console.log({ emailSignup });
//       }
//     } catch (error) {
//       console.error("비밀번호 재설정 중 오류:", error);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
//       <div className="w-full flex justify-between items-center font-SUITE">
//         <Link className="custom-arrow" to="/Findpassword">
//           <img src={arrow} alt="arrow" />
//         </Link>
//         <h1 className="custom-findtitle text-center inline-block w-1/2">
//           비밀번호 찾기
//         </h1>
//         <div className="mb-5" />
//       </div>
//       <hr />
//       <div className="mb-12" />
//       <div className="custom-findform1 border border-1 border-white rounded-3xl w-2/3 m-auto">
//         <div className="flex items-center justify-center ">
//           <div className="mb-40" />
//           <img src={logo} width="100px" height="100px" alt="umark" />
//         </div>
//         <p className="custom-findinfo text-center">비밀번호를 재설정해주세요</p>
//         <br />
//         <div className="custom-findform2 text-center inline-block relative">
//           <span className="custom-findlabel2 absolute ml-4 left-50 top-70 text-white mt-3 text-2xl">
//             비밀번호
//           </span>
//           <input
//             name="newPassword"
//             type="password"
//             placeholder="8자리 이상, 특수문자 포함"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="custom-findinput2 bg-black text-white px-60 py-3 rounded-full text-left focus:outline-none border border-1 border-white placeholder-gray-300"
//           />
//           <div className="mb-6" />
//           <span className="custom-findlabel2 absolute ml-4 left-50 top-70 text-white mt-3 text-2xl">
//             비밀번호 확인
//           </span>
//           <input
//             name="newPasswordConfirm"
//             type="password"
//             value={newPasswordConfirm}
//             onChange={(e) => setNewPasswordConfirm(e.target.value)}
//             className="custom-findinput1 bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white placeholder-gray-300"
//           />
//           <div className="mb-12" />
//           <button
//             type="button"
//             onClick={handleResetPassword}
//             className="custom-tologin text-black px-60 py-3 rounded-full font-bold"
//           >
//             로그인 하러가기
//           </button>
//           <div className="mb-20" />
//         </div>
//       </div>
//       <br />
//       <br />
//     </div>
//   );
// }
import React from "react";
import { useState } from "react";
import logo from "../img/logo.webp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import arrow from "../img/arrow.png";
import "../css/Password.css";
import axios from "axios";
// import Signup from "./Signup";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleResetPassword = async () => {
    try {
      if (newPassword !== newPasswordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const requestBody = {
        email: email,
        newPassword: newPassword,
      };

      const response = await axios.patch(
        "/member/changepasswordbyemail",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/Login");
      } else {
        alert("비밀번호 변경에 실패하였습니다.");
      }
    } catch (error) {
      console.error("비밀번호 재설정 중 오류:", error);
      alert("비밀번호 변경에 실패하였습니다.");
    }
  };


  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white">
      <div className="w-full flex justify-between items-center font-SUITE">
        <Link className="custom-arrow" to="/Findpassword">
          <img src={arrow} alt="arrow" />
        </Link>
        <h1 className="custom-findtitle text-center inline-block w-1/2">
          비밀번호 찾기
        </h1>
        <div className="mb-5" />
      </div>
      <hr />
      <div className="mb-12" />
      <div className="custom-findform1 border border-1 border-white rounded-3xl w-2/3 m-auto">
        <div className="flex items-center justify-center ">
          <div className="mb-40" />
          <img src={logo} width="100px" height="100px" alt="umark" />
        </div>
        <p className="custom-findinfo text-center">비밀번호를 재설정해주세요</p>
        <br />
        <div className="custom-findform2 text-center inline-block relative">
          <span className="custom-findlabel2 absolute ml-4 left-50 top-70 text-white mt-3 text-2xl">
            비밀번호
          </span>
          <input
            name="newPassword"
            type="password"
            placeholder="8자리 이상, 특수문자 포함"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="custom-findinput2 bg-black text-white px-60 py-3 rounded-full text-left focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <div className="mb-6" />
          <span className="custom-findlabel2 absolute ml-4 left-50 top-70 text-white mt-3 text-2xl">
            비밀번호 확인
          </span>
          <input
            name="newPasswordConfirm"
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            className="custom-findinput1 bg-black text-white px-60 py-3 rounded-full focus:outline-none border border-1 border-white placeholder-gray-300"
          />
          <div className="mb-12" />
          <button
            type="button"
            onClick={handleResetPassword}
            className="custom-tologin text-black px-60 py-3 rounded-full font-bold"
          >
            로그인 하러가기
          </button>
          <div className="mb-20" />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
