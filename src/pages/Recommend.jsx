import React, { useState } from 'react';
import './Recommend.css';
import SearchBox from '../components/SearchBox';
import Card from '../cards/Card';
import { cardsData } from '../data/CardData';
import Modal from '../components/Modal';

export default function Recommend() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (index) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
            <div className='container py-5'>
                <div className='top-container'>
                    <h3 className='title-big'>추천 북마크</h3>
                    <SearchBox />
                </div>
                <div className='row'>
                    {cardsData.map((card, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-sm-auto mt-5">
                            <Card
                                {...card}
                                onClick={(isOpen) => (isOpen ? openModal(index) : closeModal())}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
}