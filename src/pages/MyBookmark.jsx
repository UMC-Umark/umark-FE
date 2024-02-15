import { FaTrashAlt } from 'react-icons/fa'
import Menubar from '../components/Menubar'
import Header from '../components/Header'
import '../pages/MyBookmark.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BookmarkList from './BookmarkList'
import { useNavigate } from 'react-router-dom' // useNavigate 추가
export default function MyBookmark() {
  const [bookmarks, setBookmarks] = useState([])

  const [writtenCount, setWrittenCount] = useState(0)

  const [likedCount, setLikedCount] = useState(0)
  useEffect(() => {
    // API 요청
    axios
      .get('/bookmarks/1/mywrite?page=1')
      .then((response) => {
        setLikedCount(response.data.data.likedCount)
      })
      .catch((error) => {
        console.error('Fetching writtenCount failed:', error)
      })
  }, []) // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 1회 실행
  useEffect(() => {
    // API 요청
    axios
      .get('/bookmarks/1/mywrite?page=1')
      .then((response) => {
        setWrittenCount(response.data.data.writtenCount)
      })
      .catch((error) => {
        console.error('Fetching writtenCount failed:', error)
      })
  }, [])
  const navigate = useNavigate() // useNavigate 초기화
  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    axios
      .get('/bookmarks/1/mywrite?page=1')
      .then((response) => {
        setBookmarks(response.data.data.myWrittenBookMarkPage.content)
        console.log(response.data.data.myWrittenBookMarkPage)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // 수정 페이지로 이동하는 함수
  const handleEdit = (bookmarkId) => {
    navigate(`/modifyBookmark/${bookmarkId}`)
  }

  return (
    <div className="flex flex-col">
      <Header />
      <Menubar />
      <div className="mx-12 sm:mx-20 my-60">
        {/* my-10 -> my-60 으로 수정 */}{' '}
        <h1 className="custom-title text-3xl font-bold mb-12">
          내가 쓴 북마크들
        </h1>
        <div className="flex items-center mb-12">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-black mr-4">
            <div className="text-center">
              <p className="text-black text-lg font-bold no-underline p-0">
                내가 쓴 북마크
              </p>
              <p className="text-4xl font-bold">{writtenCount}</p>
            </div>
          </div>
          <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center ml-2 text-black">
            <div className="text-center">
              <p className="text-black text-lg font-bold no-underline p-0">
                추천한 북마크
              </p>
              <p className="text-4xl font-bold">{likedCount}</p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 pt-4">your bookmark</h2>
        <hr className="border-b-4 border-black mb-8" />
        <div className="my-bookmark-container">
          <div className="pt-4 item-center text-2xl font-bold flex-wrap">
            <BookmarkList bookmarks={bookmarks} onEdit={handleEdit} />
          </div>
          <div className="border-b-2 border-black mt-2"></div>
        </div>
      </div>
    </div>
  )
}
