import React, { useState } from 'react'
import Menubar from '../components/Menubar'
import Header from '../components/Header'
import axios from 'axios'

function Bookmark() {
  const [title, setTitle] = useState('')
  const [url, setURL] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    let accessToken = localStorage.getItem('accessToken') // 초기 accessToken

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }

    try {
      await axios.post(
        '/bookmarks/add',
        {
          title,
          url,
          content,
          hashTags: tags.split(' ').map((tag) => ({ content: tag })),
        },
        { headers }
      )

      handleCancel() // 성공 시 취소 로직 호출
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Access Token이 만료된 경우
        const newAccessToken = await refreshAccessToken() // 새로운 Access Token을 얻습니다.
        if (newAccessToken) {
          // 새로운 Access Token으로 요청을 재시도합니다.
          accessToken = newAccessToken // 새로운 accessToken으로 업데이트
          localStorage.setItem('accessToken', accessToken) // 로컬 스토리지 업데이트
          try {
            await axios.post(
              '/bookmarks/add',
              {
                title,
                url,
                content,
                hashTags: tags.split(' ').map((tag) => ({ content: tag })),
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )

            handleCancel() // 성공 시 취소 로직 호출
          } catch (retryError) {
            console.error('Retry failed:', retryError) // 재시도 요청 실패 처리
          }
        }
      } else {
        console.error('Request failed:', error) // 다른 종류의 오류 처리
      }
    }
  }

  const handleCancel = () => {
    setTitle('')
    setURL('')
    setContent('')
    setTags('')
  }

  return (
    <div>
      <Header />
      <Menubar />
      <div className="mt-60">
        {' '}
        {/* mt-20 -> mt-60 으로 수정 */}
        <div className="items-center justify-center flex-col h-4/6">
          <form
            onSubmit={handleSubmit}
            className="w-96 bg-gray-100 shadow-lg mx-auto border-black border-2"
          >
            <div className="flex items-stretch">
              <label
                htmlFor="title"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black font-SUITE"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-4/5 p-2 bg-gray-100 focus:outline-none font-SUITE"
                maxLength={20}
                placeholder="20자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="url"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black font-SUITE"
              >
                URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                className="w-4/5 mt-1 p-2 bg-gray-100 focus:outline-none font-SUITE"
                placeholder="참고 URL을 작성해줘"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="content"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black font-SUITE"
              >
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-4/5 h-80 mt-1 p-2 bg-gray-100 focus:outline-none font-SUITE"
                maxLength={250}
                placeholder="250자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="tags"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black font-SUITE"
              >
                태그
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-4/5 mt-1 p-2 bg-gray-100 focus:outline-none font-SUITE"
                placeholder="#카테고리 #종류 #기타"
              />
            </div>
          </form>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 h-12 w-36 font-bold rounded-full border border-black bg-white text-black hover:bg-gray-300 focus:outline-none w-auto font-SUITE"
            >
              작성 취소
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 px-4 h-12 w-36 font-bold rounded-full border border-black bg-orange-500 text-white hover:bg-orange-600 focus:outline-none w-auto font-SUITE"
            >
              북마크 업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookmark
