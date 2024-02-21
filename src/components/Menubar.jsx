import React from 'react'
import { Link } from 'react-router-dom'

export default function Menubar() {
  return (
    <div className="menu-bar bg-white shadow-lg mt-24 p-4 sm:block fixed h-16 w-full top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl lg:ml-40 md:ml-20 md:mr-8 font-semibold text-gray-500 hover:text-black transition duration-200 font-SUITE">
            <Link to="/recommend">추천 북마크</Link>
          </div>
          <div className="text-2xl lg:mr-40 md:ml-8 md:mr-20 font-semibold text-gray-500 hover:text-black transition duration-200 font-SUITE">
            <Link to="/allbookmarks">모든 북마크</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
