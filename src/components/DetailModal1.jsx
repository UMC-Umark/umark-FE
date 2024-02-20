import React from "react";
import "../css/DetailModal.css";

export default function DetailModal1({ closeDetailModal1 }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-80">
      <div className="modal-container max-w-5xl w-full h-3/4 overflow-y-auto">
        <div className="mt-10" />
        <h1 className="custom-agree text-center flex">umark 약관</h1>
        <div className="flex justify-center">
          <button
            className="custom-checkbutton text-gray-300 font-bold px-10 py-2 rounded-lg inline-block"
            onClick={closeDetailModal1}
          >
            닫기
          </button>
        </div>
        <div className="p-4">umark 약관 정책</div>
      </div>
    </div>
  );
}
