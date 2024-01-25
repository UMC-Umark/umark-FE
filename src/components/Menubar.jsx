import React from 'react'

export default function Menubar() {
  return (
    <div className="bg-white shadow-lg p-4 ml-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className='ml-40 text-2xl font-semibold text-gray-500 hover:text-black transition duration-200'>최신 북마크</div>
          <div className='text-2xl font-semibold text-gray-500 hover:text-black transition duration-200'>추천 북마크</div>
          <div className='mr-40 text-2xl font-semibold text-gray-500 hover:text-black transition duration-200'>모든 북마크</div>
        </div>
      </div>
    </div>
  )
}
