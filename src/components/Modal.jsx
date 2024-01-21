import React from 'react';

export default function Modal({closeModal}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-80">
      <div className="mt-80" />
      <h1 className="text-5xl font-bold text-center py-40">약관에 동의해주세요</h1>
      <button className="bg-white text-black text-3xl font-bold px-40 py-6 rounded-lg" onClick={closeModal}>확인</button>
    </div>
  );
}
