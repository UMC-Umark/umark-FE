import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import Menubar from '../components/Menubar';
import Header from "../components/Header";
import "../pages/MyBookmark.css"
import axios from 'axios';

export default function MyBookmark() {
  axios.get("http://backendurl")
    .then((Response)=>{console.log(Response.data)})
    .catch((Error)=>{console.log(Error)})

  return (
    <div className="flex flex-col"> 
      <Header/>
      <Menubar />
      <div className='mx-12 sm:mx-20 my-10'>
        <h1 className="custom-title text-3xl font-bold mb-12">내가 쓴 북마크들</h1>

        <div className="flex items-center mb-12">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-black mr-4">
            <div className="text-center">
            <p className="text-black text-lg font-bold no-underline p-0">내가 쓴 북마크</p>
              <p className="text-4xl font-bold">04</p>
            </div>
          </div>
          <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center ml-2 text-black">
            <div className="text-center">
            <p className="text-black text-lg font-bold no-underline p-0">추천한 북마크</p>
              <p className="text-4xl font-bold">38</p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 pt-4">your bookmark</h2>

        <hr className="border-b-2 border-black mb-8" />

        <div className="my-bookmark-container">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bookmark-card bg-greens">
              <FaTrashAlt
                className="cursor-pointer absolute top-2 right-2 text-red-50"
                size={24}
              />
              <p className="pt-4 item-center text-2xl font-bold">오프라인 행사 <br /> 준비는 이렇게 하자</p>
              <p className="pt-2 text-xl text-gray-500 text-bold">2024-01-01 14:20</p>
              <div className="flex mt-2">
                {[1, 2, 3].map((tagIndex) => (
                  <div key={tagIndex} className={`flex-shrink-0 p-2 w-auto h-8 bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-500 text-lg ml-1 mb-4 ${tagIndex === 1 ? 'w-16' : tagIndex === 2 ? 'w-24' : 'w-32'}`}>
                    #{tagIndex === 1 ? '대관' : tagIndex === 2 ? '행사' : '블로그글'}
                  </div>
                ))}
              </div>
              <div className="border-b-2 border-black mt-2"></div>
              <div className="text-xl font-bold text-center mt-2">수정하기</div>
            </div>
          ))}
        </div>
        <div className="my-bookmark-container">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bookmark-card">
              <FaTrashAlt
                className="cursor-pointer absolute top-2 right-2 text-gray-400"
                size={24}
              />
              <p className="pt-4 item-center text-2xl font-bold">오프라인 행사 <br /> 준비는 이렇게 하자</p>
              <p className="pt-2 text-xl text-gray-500 text-bold">2024-01-01 14:20</p>
              <div className="flex mt-2 ">
                {[1, 2, 3].map((tagIndex) => (
                  <div key={tagIndex} className={`flex-shrink-0 w-auto h-8 bg-gray-300 rounded-lg ml-1 flex items-center justify-center font-bold text-gray-500 text-lg mb-4 ${tagIndex === 1 ? 'w-16' : tagIndex === 2 ? 'w-24' : 'w-32'}`}>
                    #{tagIndex === 1 ? '대관' : tagIndex === 2 ? '행사' : '블로그글'}
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
  )
}