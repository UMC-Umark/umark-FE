//CardList.jsx

import React from "react";
import Card from './Card';

export default function CardList({cardsData, onClick}) {
    return (
        <div className='row'>
            {cardsData.map((bookmark) => (
                <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-auto mt-5">
                    <Card
                        {...bookmark}
                        onClick={onClick}
                    />
                </div>
            ))}
        </div>
    )
}