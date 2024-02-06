//Recommend.jsx

import React, { useState, useEffect } from 'react';
import './Recommend.css';
import SearchBox from '../components/SearchBox';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import CardList from '../cards/CardList';
import { cardsData } from '../data/CardData';
import BookmarkModal from '../components/BookmarkModal';
import axios from 'axios';

export default function Recommend() {
    // const [cardsData, setCardsData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/bookmarks/recommends?page=0');
                console.log(response.data);
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
        if (isOpen === true) {
            openModal();
        }

        if (isOpen === false) {
            closeModal();
        }
    }    

    return (
        <div className="flex flex-col">
            <Header />
            <Menubar />
            <section className='my-10'>
                <div className='container py-5'>
                    <div className='top-container'>
                        <h3 className='title-big'>추천 북마크</h3>
                        <SearchBox />
                    </div>
                    <CardList
                        cardsData={cardsData}
                        onClick={handleModal}
                    />
                </div>
                <BookmarkModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </section>
        </div>
    );
}