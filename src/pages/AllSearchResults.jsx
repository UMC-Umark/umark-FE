import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import SearchBox from '../components/AllSearchBox';
import CardList from '../cards/CardList';
import BookmarkModal from '../components/BookmarkModal';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';
import './Recommend.css';

const AllSearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialKeyword = searchParams.get('keyWord');
    const [keyword, setKeyword] = useState(initialKeyword);
    const [cardsData, setCardsData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [likeCount, setLikeCount] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 15;
    const [totalPages, setTotalPages] = useState(0);
    const [myLikeArray, setMyLikeArray] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post('/member/refresh', { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            setAccessToken(accessToken);
            return accessToken;
        } catch (error) {
            console.error('Refresh token error:', error);
            return null;
        }
    };

    const fetchData = async (searchKeyword) => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const responseMyLike = await axios.get(`/bookmarks/mylike?page=1`, { headers });
            if (responseMyLike.data.data) {
                const ids = responseMyLike.data.data.myLikeBookMarkPage.content.map(
                    (item) => item.id
                );
                setMyLikeArray(ids);
            }

            const response = await axios.get(
                `/bookmarks/search?keyWord=${searchKeyword}&page=1`,
                { headers }
            );
            const responseData = response.data.data;
            console.log(responseData);
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
                    fetchData();
                } else {
                    console.log('error');
                }
            } else {
                console.error('Fetching data failed:', error);
            }
        }
    };

    useEffect(() => {
        fetchData(keyword);
    }, [keyword, accessToken]);

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

    const handleSearch = async (inputKeyword) => {
        try {
            setKeyword(inputKeyword);
        } catch (error) {
            console.error('Error fetching search data:', error);
        }
    };

    return (
        <div className="flex flex-col">
            <Header />
            <Menubar />
            <div className="my-40">
                <div className="container py-5">
                    <div className="top-container">
                        <h3 className="title-big font-SUITE">모든 검색 결과</h3>
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
};

export default AllSearchResults;
