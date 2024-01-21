import React from 'react';

export default function check({closeModal}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-80">
      <div className="mt-80" />
      <div>
      <h1 className="text-5xl font-bold text-center py-40">일치하는 정보가 존재하지 않습니다</h1>
      <h1 className="text-4xl text-center">(입력하신 내용을 다시 확인해주세요)</h1></div>
      <div className="mt-20" />
      <button className="bg-white text-black text-3xl font-bold px-40 py-6 rounded-lg" onClick={closeModal}>확인</button>
    </div>
  );
}
