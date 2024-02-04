import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import Menubar from '../components/Menubar';
import Header from "../components/Header";
import "../pages/MyBookmark.css";

export default function MyBookmark() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // 백엔드 서버로부터 데이터 가져오기
    const fetchData = async () => {
      try {
        const response = await axios.get('http://15.165.194.140/bookmarks/{memberId}/mywrite?page=1'); // 실제 백엔드 URL로 교체
        setBookmarks(response.data); // 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <Menubar />
      <div className="mx-12 sm:mx-24 my-10">
        <h1 className="custom-title text-3xl font-bold mb-12">
          내가 쓴 북마크들
        </h1>

        <div className="flex items-center mb-12">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-black mr-4">
            <div className="text-center">
              <p className="text-black text-lg font-bold no-underline p-0">
                내가 쓴 북마크
              </p>
              <p className="text-4xl font-bold">04</p>
            </div>
          </div>
          <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center ml-2 text-black">
            <div className="text-center">
              <p className="text-black text-lg font-bold no-underline p-0">
                추천한 북마크
              </p>
              <p className="text-4xl font-bold">38</p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 pt-4">your bookmark</h2>

        <hr className="border-b-2 border-black mb-8" />

        

        <div className="my-bookmark-container">
          {bookmarks.map((bookmark, index) => (
            <div key={index} className="bookmark-card bg-greens">
              <FaTrashAlt
                className="cursor-pointer absolute top-2 right-2 text-b"
                size={24}
              />
              <p className="pt-4 item-center text-2xl font-bold">
                {bookmark.title}
              </p>
              <p className="pt-2 text-xl text-gray-500 text-bold">
                {bookmark.date}
              </p>
              <div className="flex mt-2">
                {bookmark.tags.map((tag, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="flex-shrink-0 p-2 w-auto h-8 bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-500 text-lg mx-1 ml-4 mb-4"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
              <div className="border-b-2 border-black mt-2"></div>
              <div className="text-xl font-bold text-center mt-2">수정하기</div> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}