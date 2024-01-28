import React from 'react'

export default function Menubar() {
  return (
    <div className="bg-white shadow-lg mt-24 p-4 hidden sm:block">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className='text-2xl lg:ml-40 md:ml-20 md:mr-8 font-semibold text-gray-500 hover:text-black transition duration-200'>
            최신 북마크
          </div>
          <div className='text-2xl mx-8 font-semibold text-gray-500 hover:text-black transition duration-200'>
            추천 북마크
          </div>
          <div className='text-2xl lg:mr-40 md:ml-8 md:mr-20 font-semibold text-gray-500 hover:text-black transition duration-200'>
            모든 북마크
          </div>
        </div>
      </div>
    </div>
  )
}
