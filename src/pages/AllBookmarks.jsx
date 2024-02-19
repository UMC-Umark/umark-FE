import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import SearchBox from '../components/SearchBox';
import CardList from '../cards/CardList';
import BookmarkModal from '../components/BookmarkModal';
import Pagination from '../components/Pagination';
import './Recommend.css';

export default function AllBookmarks() {
    // 상태 관리
    const [cardsData, setCardsData] = useState([]); // 북마크 데이터
    const [isModalOpen, setIsModalOpen] = useState(false); // 북마크 모달 열림 상태
    const [likeCount, setLikeCount] = useState([]); // 좋아요 수
    const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
    const pageSize = 15; // 페이지당 아이템 개수
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [myLikeArray, setMyLikeArray] = useState([]); // 내가 좋아요한 북마크 배열
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')); // accessToken 상태 추가

    // AccessToken 갱신 함수
    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('/member/refresh', { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            setAccessToken(accessToken); // 새로운 accessToken으로 상태 업데이트
            return accessToken;
        } catch (error) {
            console.error('Refresh token error:', error);
            return null;
        }
    };

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            // 내가 좋아요한 북마크 가져오기
            const responseMyLike = await axios.get(`/bookmarks/1/mylike?page=1`, { headers });
            if (responseMyLike.data.data) {
                const ids = responseMyLike.data.data.myLikeBookMarkPage.content.map(
                    (item) => item.id
                );
                setMyLikeArray(ids);
            }

            // 전체 북마크 가져오기
            const response = await axios.get(
                `/bookmarks?page=${pageNumber}&size=${pageSize}`,
                { headers }
            );
            const responseData = response.data.data;
            const dataWithIsReported = responseData.content.map((item) => ({
                ...item,
                isReported: item.isReported,
            }));
            setCardsData(dataWithIsReported);
            setTotalPages(responseData.totalPages);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    // 새로운 accessToken으로 다시 요청 보내기
                    fetchData();
                } else {
                    // 새로운 accessToken을 받아오지 못한 경우, 예: 로그인 페이지로 이동
                    console.log('error');
                }
            } else {
                console.error('Fetching data failed:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber, accessToken]); // 페이지 번호 또는 accessToken이 변경될 때마다 호출

    // 검색 처리 함수
    const handleSearch = async (keyword) => {
        try {
            const response = await axios.get(`/bookmarks/search?keyWord=${keyword}&page=1`);
            const responseData = response.data.data;
            const dataWithIsReported = responseData.content.map((item) => ({
                ...item,
                isReported: item.isReported,
            }));
            setCardsData(dataWithIsReported);
            setTotalPages(responseData.totalPages);
        } catch (error) {
            console.error('Error fetching search data:', error);
        }
    };

    // 북마크 모달 열고 닫는 함수
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

    return (
        <div className="flex flex-col">
            <Header />
            <Menubar />
            <div className="my-40">
                <div className="container py-5 border">
                    <div className="top-container border">
                        <h3 className="title-big font-SUITE">모든 북마크</h3>
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
    );
}