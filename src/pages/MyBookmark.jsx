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
  const accessToken = localStorage.getItem('accessToken')
  const memberId = localStorage.getItem('memberId')
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('/member/refresh', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
      return accessToken
    } catch (error) {
      console.error('Refresh token error:', error)
      // Refresh Token이 유효하지 않을 경우 로그인 페이지로 이동할 수 있습니다.
      // navigate('/login');
      return null
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      let currentAccessToken = localStorage.getItem('accessToken')

      const headers = {
        Authorization: `Bearer ${currentAccessToken}`,
      }

      try {
        const response = await axios.get(
          `/bookmarks/${accessToken}/mywrite?page=1`,
          { headers }
        )
        setBookmarks(response.data.data.myWrittenBookMarkPage.content)
        // 다른 state 설정
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken()
          if (newAccessToken) {
            const headers = {
              Authorization: `Bearer ${newAccessToken}`,
            }
            const response = await axios.get(
              `/bookmarks/${memberId}/mywrite?page=1`,
              { headers }
            )
            setBookmarks(response.data.data.myWrittenBookMarkPage.content)
            // 다른 state 설정
          } else {
            // 새로운 accessToken을 받아오지 못한 경우, 예: 로그인 페이지로 이동
            console.log('error')
          }
        } else {
          console.error('Fetching data failed:', error)
        }
      }
    }

    fetchData()
  }, [])
  useEffect(() => {
    // API 요청
    axios
      .get(`/bookmarks/${memberId}/mywrite?page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setWrittenCount(response.data.data.writtenCount)
      })
      .catch((error) => {
        console.error('Fetching writtenCount failed:', error)
      })
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const currentAccessToken = localStorage.getItem('accessToken')
      const headers = {
        Authorization: `Bearer ${currentAccessToken}`,
      }

      try {
        const response = await axios.get(`/bookmarks/1/mylike?page=1`, {
          headers,
        })
        setLikedCount(response.data.data.likedCount)
        console.log(response.data)
      } catch (error) {
        console.error('Fetching likedCount failed:', error)
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken()
          if (newAccessToken) {
            const headers = {
              Authorization: `Bearer ${newAccessToken}`,
            }
            const response = await axios.get(`/bookmarks/mylike?page=1`, {
              headers,
            })
            setLikedCount(response.data.data.likedCount)
            console.log(response.data)
          } else {
            console.log('error')
          }
        }
      }
    }

    fetchData()
  }, [])
  const navigate = useNavigate() // useNavigate 초기화
  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    axios
      .get(`/bookmarks/${memberId}/mywrite?page=1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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