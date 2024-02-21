import Menubar from '../components/Menubar'
import Header from '../components/Header'
import '../pages/MyBookmark.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import BookmarkList from './BookmarkList'
import { useNavigate } from 'react-router-dom'

export default function MyBookmark() {
  const [bookmarks, setBookmarks] = useState([])

  const [writtenCount, setWrittenCount] = useState(0)

  const [likedCount, setLikedCount] = useState(0)

  const accessToken = localStorage.getItem('accessToken')

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('/member/reissue', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
      return accessToken
    } catch (error) {
      console.error('Refresh token error:', error)
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
        const response = await axios.get(`/bookmarks/mywrite?page=1`, {
          headers,
        })

        setBookmarks(response.data.data.myWrittenBookMarkPage.content)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newAccessToken = await refreshAccessToken()
          if (newAccessToken) {
            const headers = {
              Authorization: `Bearer ${newAccessToken}`,
            }
            const response = await axios.get(`/bookmarks/mywrite?page=1`, {
              headers,
            })
            setBookmarks(response.data.data.myWrittenBookMarkPage.content)
          } else {
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
    axios
      .get(`/bookmarks/mywrite?page=1`, {
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
        const response = await axios.get(`/bookmarks/mylike?page=1`, {
          headers,
        })
        setLikedCount(response.data.data.likedCount)
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
          } else {
            console.log('error')
          }
        }
      }
    }

    fetchData()
  }, [])
  const navigate = useNavigate() // useNavigate 초기화

  // 수정 페이지로 이동하는 함수
  const handleEdit = (bookmarkId) => {
    navigate(`/modifyBookmark/${bookmarkId}`)
  }
  const handleDeleteSuccess = () => {
    setWrittenCount((prevCount) => prevCount - 1)
  }

  const [currentTab, setCurrentTab] = useState('written')
  useEffect(() => {
    const fetchData = async () => {
      // 현재 탭에 따라 적절한 API 호출
      if (currentTab === 'written') {
        await fetchMyWrittenBookmarks()
      } else if (currentTab === 'liked') {
        await fetchMyLikedBookmarks()
      }
    }

    fetchData()
  }, [currentTab])

  const fetchMyWrittenBookmarks = async () => {
    // 내가 쓴 북마크를 불러오는 로직
    try {
      const accessToken = localStorage.getItem('accessToken')

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }

      // 내가 쓴 북마크 데이터를 불러오는 API 요청
      const response = await axios.get(`/bookmarks/mywrite?page=1`, config)

      // 응답 데이터에서 북마크 목록을 상태에 저장
      setBookmarks(response.data.data.myWrittenBookMarkPage.content)
    } catch (error) {
      console.error('Fetching my written bookmarks failed:', error)
      // 에러 처리 로직 (예: 인증 오류 시 로그인 페이지로 리다이렉션)
    }
  }

  const fetchMyLikedBookmarks = async () => {
    // 내가 추천한 북마크를 불러오는 로직
    try {
      const accessToken = localStorage.getItem('accessToken')

      // API 요청을 위한 헤더 설정
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }

      // 내가 추천한 북마크 데이터를 불러오는 API 요청
      const response = await axios.get(`/bookmarks/mylike?page=1`, config)

      // 응답 데이터에서 북마크 목록을 상태에 저장
      setBookmarks(response.data.data.myLikeBookMarkPage.content)
    } catch (error) {
      console.error('Fetching my liked bookmarks failed:', error)
    }
  }
  return (
    <div className="flex flex-col">
      <Header />
      <Menubar />
      <div className="xl:mx-20 mt-52 ml-8 sm:mx-8">
        {/* my-10 -> my-60 으로 수정 */}{' '}
        <h1 className="custom-title text-3xl font-bold mb-12 font-SUITE xl:text-left sm:text-center sm:mx-12 xl:mx-0">
          내가 쓴 북마크들
        </h1>
        <div className="flex items-center mb-8 md:px-0 md:mx-0">
          <button
            onClick={() => setCurrentTab('written')}
            className="w-40 h-40 bg-mint rounded-full flex items-center justify-center text-black mr-4 hover:underline focus:outline-none"
          >
            <div className="text-center">
              <p className="text-black text-xl font-bold no-underline p-0">
                내가 쓴 북마크
              </p>
              <p className="text-5xl pt-1 font-bold font-SUITE">{writtenCount}</p>
            </div>
          </button>
          <button
            onClick={() => setCurrentTab('liked')}
            className="w-40 h-40 bg-orange rounded-full flex items-center justify-center ml-2 text-black font-SUITE hover:underline focus:outline-none"
          >
            <div className="text-center">
              <p className="text-black text-xl font-bold no-underline p-0">
                추천한 북마크
              </p>
              <p className="text-5xl pt-1 font-bold">{likedCount}</p>
            </div>
          </button>
        </div>
      </div>
      <div className="pt-4 item-center text-2xl font-bold flex-wrap xl:mx-20 sm:mx-12">
        <BookmarkList
          bookmarks={bookmarks}
          onEdit={handleEdit}
          onDelete={handleDeleteSuccess}
          isMyLikedBookmark={currentTab === 'liked'}
        />
      </div>
    </div>
  )
}
