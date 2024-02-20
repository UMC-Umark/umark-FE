import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { reportedData } from './CardReported'; // CardReported.jsx 파일에서 reportedData를 import

import bookMark from '../img/bookMark.png';
import bookMarkFill from '../img/bookMarkFill.png';
import './Card.css';

export default function Card({ id, title, createdAt, hashTagContent, content, url, onClick, isReported, myLike, accessToken }) {
    const [liked, setLiked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const date = new Date(createdAt);
    const formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}`;

    // reportedData 배열에서 데이터를 가져와서 변수에 할당
    const { reportedTitle, reportedContent } = reportedData[0];

    const handleLike = async () => {
        if (!accessToken) {
            // 로그인이 되어 있지 않으면 아무런 동작도 하지 않음
            alert('로그인이 필요합니다. 로그인해주세요.');
            return;
        }
        try {
            const response = await axios.post(`/bookmarks/${id}/likes?memberId=1`, null, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log('bookmarkID:', {id}, response.data.data);
            setLiked(!liked);
            onClick(!liked, response.data.data.likeCount);
        } catch(error) {
            console.error('Error sending POST request:', error);
        }
    }

    useEffect(() => {
        if (myLike.includes(id) && accessToken) {
            setLiked(true); // 로그인 상태에서만 북마크가 된 경우에만 liked를 true로 설정
        } else {
            setLiked(false); // 로그인 상태가 아니거나 북마크가 되지 않은 경우에는 false로 설정
    }
    }, [myLike, accessToken]);

    const reportBookmark = () => {
        navigate('/reporting', { state: { bookmarkId: id } });
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="header-wrap">
                    <h4>{isReported ? reportedTitle : title}</h4> 
                    {isReported ? null : (
                        <div>
                            <img 
                                className="card-img-top" 
                                src={hovered || liked ? bookMarkFill : bookMark}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
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
                            <h6 className="tags-wrap flex items-center gap-x-4">
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
                <p className="text-para">{isReported ? reportedContent : content}</p>
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
