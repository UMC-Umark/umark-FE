import { FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function BookmarkList({ bookmarks, onEdit, onDelete, isMyLikedBookmark }) {
  const [localBookmarks, setLocalBookmarks] = useState(bookmarks)
  useEffect(() => {
    setLocalBookmarks(bookmarks)
  }, [bookmarks])

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('/member/reissue', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
      return accessToken
    } catch (error) {
      console.error('Refresh token error:', error)
      return null
    }
  }

  const handleDelete = async (bookMarkId) => {
    let accessToken = localStorage.getItem('accessToken')
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    try {
      const response = await axios.delete(
        `/bookmarks/delete/${bookMarkId}`,
        config
      )
      console.log('Bookmark deleted successfully', response.data)
      setLocalBookmarks(
        localBookmarks.filter((bookmark) => bookmark.id !== bookMarkId)
      )
      onDelete()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          accessToken = newAccessToken
          localStorage.setItem('accessToken', accessToken)
          return handleDelete(bookMarkId) // 재귀적으로 다시 시도
        }
      } else {
        console.error('Error deleting bookmark:', error)
      }
    }
  }

  return (
    <div className="flex flex-col">
      {' '}
      {!isMyLikedBookmark ? (
        <h2 className="text-3xl ml-6 font-bold mb-4  font-SUITE xl:mx-20 sm:mx-12">
          your bookmark
        </h2>
      ) : (
        <h2 className="text-3xl font-bold mb-4 font-SUITE xl:mx-20 sm:mx-12">
          our bookmark
        </h2>
      )}
      <hr className="border-b-4  border-black mb-8 xl:mx-20 sm:mx-12" />
      <div className="xl:flex flex-wrap justify-start">
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
              className="px-2 mb-4 xl:w-1/4  sm:w-full" // x축 패딩을 각 박스에 적용하여 실제 너비 조정
            >
              <div className="border-2 border-black bg-gray-100 shadow-md h-full relative mx-2">
                {/* 여기에 mx-2를 추가하여 박스 사이의 간격을 조정 */}
                {!isMyLikedBookmark && (
                  <FaTrashAlt
                    onClick={() => handleDelete(bookmark.id)}
                    className="cursor-pointer absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    size={24}
                  />
                )}
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
                </div>{' '}
                {!isMyLikedBookmark && (
                  <>
                    <hr className="border-b-2 border-black my-2" />
                    <div className="flex items-center justify-center">
                      {' '}
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => onEdit(bookmark.id)}
                          className="w-full text-2xl font-bold text-center px-8 mb-3 mt-1 font-SUITE"
                        >
                          수정하기
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookmarkList
