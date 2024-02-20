import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function BookmarkList({ bookmarks, onEdit, onDelete }) {
  const [localBookmarks, setLocalBookmarks] = useState(bookmarks)
  useEffect(() => {
    setLocalBookmarks(bookmarks)
  }, [bookmarks])

  const handleDelete = async (bookMarkId) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const response = await axios.delete(
        `/bookmarks/delete/${bookMarkId}`,
        config
      )

      if (response.data.isSuccess) {
        console.log('Bookmark deleted successfully', response.data)
        // 삭제 성공 후 로컬 상태 업데이트
        const updatedBookmarks = localBookmarks.filter(
          (bookmark) => bookmark.id !== bookMarkId
        )
        setLocalBookmarks(updatedBookmarks)
        onDelete()
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error)
    }
  }

  return (
    <div className="flex flex-wrap justify-start">
      {localBookmarks.map((bookmark, index) => {
        const date = new Date(bookmark.createdAt)
        const formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date
          .getDate()
          .toString()
          .padStart(2, '0')} ${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        return (
          <div
            key={index}
            className="px-2 w-1/4 mb-4" // x축 패딩을 각 박스에 적용하여 실제 너비 조정
          >
            <div className="border-2 border-black bg-gray-100 shadow-md h-full relative mx-2">
              {' '}
              {/* 여기에 mx-2를 추가하여 박스 사이의 간격을 조정 */}
              <FaTrashAlt
                onClick={() => handleDelete(bookmark.id)}
                className="cursor-pointer absolute top-2 right-2 text-gray fill-gray-400"
                size={24}
              />
              <div className="flex flex-col mb-1 h-4/5 ml-4">
                <p className="pt-4 item-center text-3xl font-bold m-2 font-SUITE break-words">
                  {bookmark.title}
                </p>
                <p className="pt-2 text-xl text-gray-400 text-bold mt-1 mb-4 ml-2 font-SUITE">
                  {formattedTime}
                </p>
                <div className="flex flex-wrap gap-2 pt-2 my-2 ml-2">
                  {Array.isArray(bookmark.hashTagContent)
                    ? bookmark.hashTagContent.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-300 rounded-lg px-2 py-1 text-xl text-gray-500 font-SUITE"
                        >
                          {tag}
                        </span>
                      ))
                    : ''}
                </div>
              </div>
              <hr className="border-b-2 border-black my-2" />
              <div className="flex items-center justify-center">
                <button
                  onClick={() => onEdit(bookmark.id)}
                  className="w-full text-2xl font-bold text-center px-8 mb-4 font-SUITE"
                >
                  수정하기
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookmarkList
