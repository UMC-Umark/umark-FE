import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import Menubar from '../components/Menubar';

export default function MyBookmark() {
  return (
    <div>
      <Menubar />
      <div className='mx-24 my-8'>
        <h1 className="text-3xl font-bold mb-12">내가 쓴 북마크들</h1>

        <div className="flex items-center mb-12">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-black mr-4">
            <div className="text-center">
              <p className="text-lg font-bold">내가 쓴 북마크</p>
              <p className="text-4xl font-bold">04</p>
            </div>
          </div>
          <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center ml-2 text-black">
            <div className="text-center">
              <p className="text-lg font-bold">추천한 북마크</p>
              <p className="text-4xl font-bold">38</p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 pt-4">your bookmark</h2>

        <hr className="border-b-2 border-black mb-8" />

        <div className="flex">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-1/4 h-75 p-4 border-2 border-black relative mb-4 mr-4 bg-red-50">
              <FaTrashAlt
                className="cursor-pointer absolute top-2 right-2 text-gray-400"
                size={24}
              />
              <p className="mt-8 ml-4 mb-4 text-3xl font-bold">오프라인 행사 <br /> 준비는 이렇게 하자</p>
              <p className="ml-4 mb-4 text-xl text-gray-500 text-bold">2024-01-01 14:20</p>
              <div className="flex mt-2">
                {[1, 2, 3].map((tagIndex) => (
                  <div key={tagIndex} className={`flex-shrink-0 p-2 w-auto h-8 bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-500 text-lg mx-1 ml-4 mb-4 ${tagIndex === 1 ? 'w-16' : tagIndex === 2 ? 'w-24' : 'w-32'}`}>
                    #{tagIndex === 1 ? '대관' : tagIndex === 2 ? '행사' : '블로그글'}
                  </div>
                ))}
              </div>
              <div className="border-b-2 border-black mt-2"></div>
              <div className="text-xl font-bold text-center mt-2">수정하기</div>
            </div>
          ))}
        </div>
        <div className="flex mt-8">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-1/4 h-75 p-4 border-2 border-black relative mb-4 mr-4 bg-red-50">
              <FaTrashAlt
                className="cursor-pointer absolute top-2 right-2 text-gray-400"
                size={24}
              />
              <p className="mt-8 ml-4 mb-4 text-3xl font-bold">오프라인 행사 <br /> 준비는 이렇게 하자</p>
              <p className="ml-4 mb-4 text-xl text-gray-500 text-bold">2024-01-01 14:20</p>
              <div className="flex mt-2">
                {[1, 2, 3].map((tagIndex) => (
                  <div key={tagIndex} className={`flex-shrink-0 p-2 w-auto h-8 bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-500 text-lg mx-1 ml-4 mb-4 ${tagIndex === 1 ? 'w-16' : tagIndex === 2 ? 'w-24' : 'w-32'}`}>
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
