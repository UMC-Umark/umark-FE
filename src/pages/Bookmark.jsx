import React, { useState } from 'react';
import Menubar from '../components/Menubar';
import Header from "../components/Header";

function Bookmark() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Subtitle:', subtitle);
    console.log('Content:', content);
    console.log('Tags:', tags);
    
    // 여기서 서버에 데이터를 업로드하거나 필요한 동작을 수행합니다.
  };

  const handleCancel = () => {
    setTitle('');
    setSubtitle('');
    setContent('');
    setTags('');
  };

  return (
    <div>
      <Header/>
      <Menubar />
      <div className="flex items-center justify-center h-screen flex-col">
        <form onSubmit={handleSubmit} className="w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="mb-4 flex items-center">
            <label htmlFor="title" className="block text-black font-bold w-1/5">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-4/5 mt-1 p-2 border rounded focus:outline-none focus:border-blue-500"
              maxLength="20"
              placeholder="20자까지 작성할 수 있어"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="subtitle" className="block text-black font-bold w-1/5">
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
            <label htmlFor="content" className="block text-black font-bold w-1/5">
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
        <div className="flex justify-between w-1/5 mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 mr-8 py-2 px-4 font-bold rounded-full border border-black bg-white text-black hover:bg-gray-300 focus:outline-none"
          >
            작성 취소
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-1/2 py-2 px-4 font-bold rounded-full border border-black bg-orange-500 text-white hover:bg-orange-600 focus:outline-none"
          >
            북마크 업로드
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;