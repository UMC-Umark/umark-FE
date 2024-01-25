import React from "react";
import "../css/Bookmark.css"; // 수정된 부분

export default function Modal({ isOpen, onClose, itemIndex }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-text">
          {`${itemIndex}번째로 추천을 누른 유마커에요!`}
        </div>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}
