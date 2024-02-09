// 북마크 수정 페이지


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menubar from '../components/Menubar';
import Header from '../components/Header';

function EditBookmarkPage({ bookmarkId }) {
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchBookmarkData = async () => {
      try {
        const response = await axios.get(`/bookmarks/${bookmarkId}`);
        const { title, url, content, hashTags } = response.data;
        setTitle(title);
        setURL(url);
        setContent(content);
        setTags(hashTags.map(tag => tag.content).join(' '));
      } catch (error) {
        console.error('Error fetching bookmark data:', error);
      }
    };

    fetchBookmarkData();
  }, [bookmarkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashTags = tags.split(' ')
                         .filter(tag => tag.trim() !== '')
                         .map(tag => ({ content: tag.startsWith('#') ? tag : `#${tag}` }));

                         try {
                          const response = await axios.put(`/bookmarks/${bookmarkId}`, {
                            title,
                            url,
                            content,
                            hashTags,
                          });
                          console.log(response.data);
                          alert('북마크가 성공적으로 수정되었습니다.');
                        } catch (error) {
                          console.error('Error updating the bookmark:', error);
                          alert('북마크 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
                        }
                      };
  const handleCancel = () => {
    // 취소 로직 구현
  };

  return (
    <div>
      <Header />
      <Menubar />
      <div className="mt-60">
        <div className="items-center justify-center flex-col h-4/6">
          <form onSubmit={handleSubmit} className="w-96 bg-gray-100 shadow-lg mx-auto border-black border-2">
            <div className="flex items-stretch">
              <label htmlFor="title" className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black">
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-4/5 p-2 bg-gray-100 focus:outline-none"
                maxLength="20"
                placeholder="20자까지 작성할 수 있어요"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="url"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                부제
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                className="w-4/5 mt-1 p-2 bg-gray-100 focus:outline-none"
                maxLength="20"
                placeholder="20자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="content"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-4/5 h-80 mt-1 p-2 bg-gray-100 focus:outline-none"
                maxLength="250"
                placeholder="250자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="tags"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                태그
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-4/5 mt-1 p-2 bg-gray-100 focus:outline-none"
                placeholder="#카테고리 #종류 #기타"
              />
            </div>
          </form>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 h-12 w-36 font-bold rounded-full border border-black bg-white text-black hover:bg-gray-300 focus:outline-none w-auto"
            >
              작성 취소
            </button>
            <button
              type="submit"
              form="bookmarkForm"
              className="py-2 px-4 h-12 w-36 font-bold rounded-full border border-black bg-orange-500 text-white hover:bg-orange-600 focus:outline-none w-auto"
            >
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBookmarkPage;
