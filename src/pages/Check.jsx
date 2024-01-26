import React from "react";
import "../css/Check.css";

export default function check({ closeModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-80">
      <div>
        <div className="mt-40" />
        <h1 className="custom-noexist font-bold text-center py-20">
          일치하는 정보가 존재하지 않습니다
        </h1>
        <h1 className="custom-check">(입력하신 내용을 다시 확인해주세요)</h1>
      </div>
      <div className="mt-20" />
      <button
        className="custom-checkb bg-white text-black font-bold px-40 py-3 rounded-lg"
        onClick={closeModal}
      >
        확인
      </button>
    </div>
  );
}
