import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../components/Header'
import Menubar from '../components/Menubar'
import SearchBox from '../components/SearchBox'
import BookmarkModal from '../components/BookmarkModal'
import CardList from '../cards/CardList'
import './Recommend.css'

export default function Recommend() {
  const [cardsData, setCardsData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/bookmarks?page=0')
        setCardsData(response.data.data.content)
        console.log('fetchData success:', response.data.data.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleModal = (isOpen) => {
    if (isOpen === true) {
      openModal()
    }

    if (isOpen === false) {
      closeModal()
    }
  }

  return (
    <div className="flex flex-col">
      <Header />
      <Menubar />
      <div className="my-40">
        <div className="container py-5">
          <div className="top-container">
            <h3 className="title-big font-SUITE">추천 북마크</h3>
            <SearchBox />
          </div>
          <CardList cardsData={cardsData} onClick={handleModal} />
        </div>
        <BookmarkModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  )
}
