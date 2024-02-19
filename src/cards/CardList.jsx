import React from "react";
import Card from './Card';

export default function CardList({ cardsData, onClick, myLike, accessToken }) {
    return (
        <div className='row'>
            {cardsData.map((bookmark) => {
                return (
                    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-auto mt-5">
                        <Card
                            {...bookmark}
                            onClick={onClick}
                            isReported={bookmark.reported}
                            myLike={myLike}
                            accessToken={accessToken}
                        />
                    </div>
                );
            })}
        </div>
    );
}
