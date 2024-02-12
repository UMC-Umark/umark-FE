import React from "react";
import Card from './Card';

// CardList.jsx
export default function CardList({ cardsData, onClick }) {
    return (
        <div className='row'>
            {cardsData.map((bookmark) => {
                // console.log(bookmark); // 각 북마크 데이터 로깅
                return (
                    <div key={bookmark.id} className="col-lg-4 col-md-6 col-sm-auto mt-5">
                        <Card
                            {...bookmark}
                            onClick={onClick}
                            isReported={bookmark.isReported} // isReported prop 전달
                        />
                    </div>
                );
            })}
        </div>
    );
}
