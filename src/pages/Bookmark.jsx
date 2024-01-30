import React, { useState } from 'react';
import Menubar from '../components/Menubar';
import Header from "../components/Header";
import axios from 'axios';

function Bookmark() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Subtitle:', subtitle);
    console.log('Content:', content);
    console.log('Tags:', tags);
  

    try {
      // 데이터를 JSON 형식으로 구성
      const data = {
        title,
        subtitle,
        content,
        hashTags: tags.split(' ').map(tag => ({ content: tag })),
      };

      // 서버에 POST 요청 보내기
      await axios.post('http://localhost:3000/bookmarks', data);

      // 업로드 성공 후 필요한 동작 수행 (예: 리다이렉트 또는 메시지 표시)
      console.log('북마크 업로드 성공');

      // 입력 필드 초기화
      handleCancel();
    } catch (error) {
      // 오류 처리
      console.error('북마크 업로드 오류:', error);
    }
  };
    

  const handleCancel = () => {
    setTitle('');
    setSubtitle('');
    setContent('');
    setTags('');
  };

  return (
    <div className="mt-20">
      <Header />
      <Menubar />
      <div className="pt-10 items-center justify-center h-screen flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-gray-100 p-6  rounded-lg shadow-lg mx-auto  sm:pt-10"
        >
          <div className="mb-4 flex items-center">
            <label htmlFor="title" className="block text-black font-bold w-1/5">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-4/5 mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
              maxLength="20"
              placeholder="20자까지 작성할 수 있어"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              htmlFor="subtitle"
              className="block text-black font-bold w-1/5"
            >
              부제
            </label>
            <input
              type="text"
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-4/5 mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
              maxLength="20"
              placeholder="20자까지 작성할 수 있어"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label
              htmlFor="content"
              className="block text-black font-bold w-1/5"
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-4/5 h-80 mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
              maxLength="250"
              placeholder="250자까지 작성할 수 있어"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="tags" className="block text-black font-bold w-1/5">
              태그
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-4/5 mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="#카테고리 #종류 #기타"
            />
          </div>
        </form>
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="py-2 px-4 h-12 font-bold rounded-full border border-black bg-white text-black hover:bg-gray-300 focus:outline-none w-auto"
          >
            작성 취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="py-2 px-4 h-12 font-bold rounded-full border border-black bg-orange-500 text-white hover:bg-orange-600 focus:outline-none w-auto"
          >
            북마크 업로드
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;