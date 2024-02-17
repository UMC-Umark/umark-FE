import React from "react";
import Card from './Card';

export default function CardList({ cardsData, onClick, myLike }) {
    return (
        <div className='row'>
            {cardsData.map((bookmark) => {
                // console.log(bookmark); 
                return (
                    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-auto mt-5">
                        <Card
                            {...bookmark}
                            onClick={onClick}
                            isReported={bookmark.reported} // isReported prop 전달
                            myLike={myLike}
                        />
                    </div>
                );
            })}
        </div>
    );
}