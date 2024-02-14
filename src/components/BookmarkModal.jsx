import React from "react";
import './BookmarkModal.css';

export default function Modal({ isOpen, onClose, likeCount }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-text">
                    {likeCount+1}번째로 추천을 누른 유마커에요!
                </div>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    );
}