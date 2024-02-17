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
    // ... (axios 요청 로직)
    const hashTags = tags.split(' ').map((tag) => ({ content: tag }))
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(
        '/bookmarks/add',
        {
          title: title,
          url: url,
          content: content,
          hashTags: hashTags,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      console.log(response.data)
      if (response.data.isSuccess) {
        console.log(response.data)
        handleCancel() // 성공 시 취소 로직 호출
      } else {
        console.error(
          `${response.data.code} : ${response.data.message} - ${JSON.stringify(
            response.data.data
          )}`
        )
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 만약 Access Token이 만료되었다면
        accessToken = refreshAccessToken() // 새로운 Access Token을 얻습니다.
        if (accessToken) {
          // 새로운 Access Token으로 요청을 재시도합니다.
          try {
            const retryResponse = await axios.post(
              '/bookmarks/add',
              {
                title: title,
                url: url,
                content: content,
                hashTags: hashTags,
                // 요청 본문
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            console.log(retryResponse.data)
            handleCancel() // 성공 시 취소 로직 호출
          } catch (retryError) {
            // 재시도 요청 실패 처리
            console.error('Retry failed:', retryError)
          }
        }
      } else {
        // 다른 종류의 오류 처리
        console.error('Request failed:', error)
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
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-4/5 p-2 bg-gray-100 focus:outline-none"
                maxLength="20"
                placeholder="20자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="url"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                className="w-4/5 mt-1 p-2 bg-gray-100 focus:outline-none"
                maxLength="20"
                placeholder="20자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="content"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-4/5 h-80 mt-1 p-2 bg-gray-100 focus:outline-none"
                maxLength="250"
                placeholder="250자까지 작성할 수 있어"
              />
            </div>
            <hr className="border-b border-black" />
            <div className="flex items-stretch">
              <label
                htmlFor="tags"
                className="ml-4 flex items-center text-black font-bold w-1/5 pr-4 border-r border-black"
              >
                태그
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-4/5 mt-1 p-2 bg-gray-100 focus:outline-none"
                placeholder="#카테고리 #종류 #기타"
              />
            </div>
          </form>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 h-12 w-36 font-bold rounded-full border border-black bg-white text-black hover:bg-gray-300 focus:outline-none w-auto"
            >
              작성 취소
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 px-4 h-12 w-36 font-bold rounded-full border border-black bg-orange-500 text-white hover:bg-orange-600 focus:outline-none w-auto"
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
