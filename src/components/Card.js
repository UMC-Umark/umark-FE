import React, { useState } from 'react';
import markLogo from '../images/bookMark.png';
import markLogoOrange from '../images/bookMarkOrange.png';

export default function Card({ title, date, tags, description, link, onClick, isAd }) {
    const [currentImage, setCurrentImage] = useState(markLogo);

    const handleImageClick = () => {
        if (isAd) {
            // 광고 카드의 경우 클릭 이벤트를 처리하지 않음
            return;
        }

        if (currentImage === markLogo) {
            setCurrentImage(markLogoOrange);
            onClick(true);  // 모달 열기 함수 호출
        } else {
            setCurrentImage(markLogo);
            // markLogoOrange -> markLogo로 바뀔 때 모달을 뜨게 하는 함수 호출
            onClick(false);  // 모달 닫기 함수 호출
        }
    };

    const renderLinkText = () => {
        if (isAd) {
            return '링크 없음!';
        } else {
            return '링크 바로가기';
        }
    };

    const handleLinkClick = (event) => {
        if (isAd) {
            event.preventDefault(); // 광고 카드일 경우 링크 클릭 방지
        }
    };

    return (
        <div className={`card ${isAd ? 'ad-card' : ''}`}>
            <div className="card-header position-relative">
                <div className="header-wrap">
                    <h4>{title}</h4>
                    <a href={link} className="d-block" onClick={handleImageClick}>
                        <img className="card-img-top d-block" src={currentImage} alt={title} />
                    </a>
                    <div className="flex flex-col">
                        <time className="text-gray-400">
                            {date}
                        </time>
                        <h5 className="flex items-center gap-x-4">
                            {tags.map((tag, index) => (
                                <a key={index} href="#" className="tag relative rounded-lg px-2.5 py-1">
                                    <div>#{tag}</div>
                                </a>
                            ))}
                        </h5>
                    </div>
                </div>
            </div>
            <div className="card-body course-details">
                <p className="text-para">{description}</p>
            </div>
            <div className="card-footer">
                <ul className="blog-meta">
                    <li>
                        <a href="#link" onClick={handleLinkClick}>{renderLinkText()}</a>
                    </li>
                    <li>
                        <a href="#report"> 신고하기</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
