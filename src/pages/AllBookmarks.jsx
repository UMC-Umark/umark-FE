import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import SearchBox from '../components/SearchBox';
import CardList from '../cards/CardList';
import BookmarkModal from '../components/BookmarkModal';
import Pagination from '../components/Pagination'; // 페이지네이션 컴포넌트 추가
import './Recommend.css';

export default function AllBookmarks() {
  const [cardsData, setCardsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
  const pageSize = 15; // 페이지당 아이템 개수
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/bookmarks?page=${pageNumber}&size=${pageSize}`);
        const responseData = response.data.data;
        const dataWithIsReported = responseData.content.map(item => ({
          ...item,
          isReported: item.isReported // 백엔드에서 "isReported" 키로 제공되므로 그대로 사용
        }));
        setCardsData(dataWithIsReported);
        setTotalPages(responseData.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [pageNumber]); // 페이지 번호가 변경될 때마다 호출

  const handleModal = (isOpen, likeCount) => {
    isOpen ? openModal() : closeModal();
    setLikeCount(likeCount);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
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
          <CardList 
            cardsData={cardsData}
            onClick={handleModal} />
          <Pagination 
            totalPages={totalPages} 
            currentPage={pageNumber} 
            onPageChange={handlePageChange} 
          />
        </div>
        <BookmarkModal
          isOpen={isModalOpen}
          onClose={closeModal}
          likeCount={likeCount} />
      </div>
    </div>
  );
}
