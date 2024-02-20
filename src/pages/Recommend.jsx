// AllBookmarks.jsx

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import SearchBox from '../components/RecSearchBox'
import CardList from '../cards/CardList'
import BookmarkModal from '../components/BookmarkModal'
import Pagination from '../components/Pagination'
import { useNavigate } from 'react-router-dom'
import './Recommend.css'

const Recommend = () => {
  const [cardsData, setCardsData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likeCount, setLikeCount] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 15
  const [totalPages, setTotalPages] = useState(0)
  const [myLikeArray, setMyLikeArray] = useState([])
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  )

  const navigate = useNavigate()

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('/member/reissue', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
      setAccessToken(accessToken)
      return accessToken
    } catch (error) {
      console.error('Refresh token error:', error)
      return null
    }
  }

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      const responseMyLike = await axios.get(`/bookmarks/mylike?page=1`, {
        headers,
      })
      if (responseMyLike.data.data) {
        const ids = responseMyLike.data.data.myLikeBookMarkPage.content.map(
          (item) => item.id
        )
        setMyLikeArray(ids)
      }

      const response = await axios.get(
        `/bookmarks/recommends?page=${pageNumber}&size=${pageSize}`,
        { headers }
      )
      const responseData = response.data.data
      const dataWithIsReported = responseData.content.map((item) => ({
        ...item,
        isReported: item.isReported,
      }))
      setCardsData(dataWithIsReported)
      setTotalPages(responseData.totalPages)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          fetchData()
        } else {
          console.log('error')
        }
      } else {
        console.error('Fetching data failed:', error)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNumber, accessToken])

  const handleSearch = async (keyword) => {
    try {
      navigate(`/recommend/search?keyWord=${keyword}`)
    } catch (error) {
      console.error('Error fetching search data:', error)
    }
  }

  const handleModal = (isOpen, likeCount) => {
    isOpen ? openModal() : closeModal()
    setLikeCount(likeCount)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col">
      <Header />
      <Menubar />
      <div className="my-40">
        <div className="container py-5">
          <div className="top-container">
            <h3 className="title-big font-SUITE">추천 북마크</h3>
            <SearchBox onSearch={handleSearch} />
          </div>
          <CardList
            cardsData={cardsData}
            onClick={handleModal}
            myLike={myLikeArray}
            accessToken={accessToken}
          />
          <Pagination
            limit={pageSize}
            totalPages={totalPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        <BookmarkModal
          isOpen={isModalOpen}
          onClose={closeModal}
          likeCount={likeCount}
        />
      </div>
    </div>
  )
}

export default Recommend
