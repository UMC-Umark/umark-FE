import React, { useState, useEffect } from 'react';
import './Recommend.css';
import SearchBox from '../components/SearchBox';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import CardList from '../cards/CardList';
import BookmarkModal from '../components/BookmarkModal';
import axios from 'axios';

export default function AllBookmarks() {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/bookmarks?page=1');
        const dataWithIsReported = response.data.data.content.map(item => ({
          ...item,
          isReported: item.reported 
        }));
        setCardsData(dataWithIsReported);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = (isOpen) => {
    isOpen ? openModal() : closeModal();
  };

  return (
    <div className="flex flex-col">
      <Header />
      <Menubar />
      <div className="my-40">
        <div className="container py-5">
          <div className="top-container">
            <h3 className="title-big font-SUITE">모든 북마크</h3>
            <SearchBox />
          </div>
          <CardList cardsData={cardsData} onClick={handleModal} />
        </div>
        <BookmarkModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}
