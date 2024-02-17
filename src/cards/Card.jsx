import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

import bookMark from '../img/bookMark.png';
import bookMarkFill from '../img/bookMarkFill.png';
import './Card.css';

export default function Card({ id, title, createdAt, hashTagContent, content, url, onClick, isReported, myLike }) {
    const [liked, setLiked] = useState(false);
    const [hovered, setHovered] = useState(false); // hovered 상태 추가
    const navigate = useNavigate(); // useNavigate 사용

    
    const date = new Date(createdAt);
    const formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}`;

    const handleLike = async () => {
        try {
            const response = await axios.post(`/bookmarks/${id}/likes?memberId=1`);
            console.log('bookmarkID:', {id}, response.data.data);
            setLiked(!liked);
            onClick(!liked, response.data.data.likeCount);
        } catch(error) {
            console.error('Error sending POST request:', error);
        }
    }

    useEffect(() => {
        if (myLike.includes(id)) {
            setLiked(!liked);
        }
    }, []);

    const reportBookmark = () => {
        navigate('/reporting', { state: { bookmarkId: id } });
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="header-wrap">
                    <h4>{isReported ? "부적절한 게시물입니다." : title}</h4> 
                    {isReported ? null : (
                        <div>
                            <img 
                                className="card-img-top" 
                                src={hovered || liked ? bookMarkFill : bookMark} // 마우스 hover 또는 좋아요 상태에 따라 이미지를 변경
                                onMouseEnter={() => setHovered(true)} // 마우스가 이미지에 올라갔을 때 hovered 상태를 true로 변경
                                onMouseLeave={() => setHovered(false)} // 마우스가 이미지에서 벗어났을 때 hovered 상태를 false로 변경
                                onClick={handleLike}
                                alt="bookMarkIcon"
                            />
                        </div>
                    )}
                    {isReported ? null : (
                        <div className="flex flex-col">
                            <time className="text-gray-400">
                                {formattedTime}
                            </time>
                            <h6 className="flex items-center gap-x-4">
                                {hashTagContent.map((tag, index) => (
                                    <div key={index} className="tags hashTagContent relative rounded-lg px-2.5 py-1">
                                        {tag}
                                    </div>
                                ))}
                            </h6>
                        </div>
                    )}
                </div>
            </div>
            <div className="card-body">
                <p className="text-para">{isReported ? "신고 누적으로 블라인드 처리된 게시물입니다." : content}</p>
            </div>
            <div className="card-footer">
                {isReported ? (
                    <div className="footer-element h-9">
                    </div>
                ) : (
                    <ul className="footer-element">
                        <li>
                            <a href={url}>링크 바로가기</a>
                        </li>
                        <li>
                        <button onClick={reportBookmark}>신고하기</button>
                        </li>
                    </ul>
                )}
            </div>
        </div>  
    );
}
