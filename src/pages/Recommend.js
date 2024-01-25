import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal'; // Modal 컴포넌트 추가
import '../css/Bookmark.css';
import { cardsData } from '../components/Data';

export default function Recommend() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const openModal = (index) => {
        setIsModalOpen(true);
        setSelectedItemIndex(index);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItemIndex(null);
    };

    return (
        <section className="w3l-courses">
            <div className="blog pb-5" id="courses">
                <div className="container py-5">
                    <h3 className="title-big text-start d-sm-none">추천 북마크</h3>
                    <div className="row">
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
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                itemIndex={selectedItemIndex}
            />
        </section>
    );
}
