import React from "react";
import "../css/Modal.css";

export default function Modal({ closeModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-80">
      <div className="mt-10" />
      <div className="modal-container">
        <h1 className="custom-agree font-bold text-center">
          약관에 동의해주세요
        </h1>
        <button
          className="custom-checkbutton bg-white text-black font-bold px-40 py-3 rounded-lg"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
}
