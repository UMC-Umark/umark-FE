import React from "react";
import './Card.css';
import BookmarkOff from '../img/BookmarkOff.png';
import BookmarkOn from '../img/BookmarkOn.png';
import axios from 'axios';
import { useState } from "react";

export default function Card({ id, title, createdAt, hashTagContent, content, url, onClick, isReported }) {
    const [liked, setLiked] = useState(false)
    const date = new Date(createdAt);
    const formattedTime = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes()}`;

    const addBookmark = () => {
        setLiked(!liked);
        onClick(true);
    }

    const deleteBookmark = () => {
        setLiked(!liked);
        onClick(false);
    }

    const handleLike = async (e) => {
        try {
            const response = await axios.post(`/bookmarks/${id}/likes?memberId=1`)
            console.log('bookmarkID:', {id}, response.data.data);
        } catch(error) {
            console.error('Error sending POST request:', error);
        }
    }
    
    return (
        <div className="card">
            <div className="card-header">
                <div className="header-wrap">
                    <h4>{isReported ? "신고된 게시물입니다" : title}</h4>
                    <div>
                        <img className="card-img-top" 
                            src={liked? BookmarkOn : BookmarkOff}
                            onClick={() => {
                                handleLike();

                                if(liked === true) {
                                    deleteBookmark();
                                }
                                
                                if(liked === false) {
                                    addBookmark();
                                }
                            }}
                            alt="bookMarkIcon"
                        />
                    </div>
                    <div className="flex flex-col">
                        <time className="text-gray-400">
                            {formattedTime}
                        </time>
                        <h6 className="flex items-center gap-x-4">
                            {hashTagContent.map((tag, index) => (
                                <div key={index} className="hashTagContent relative rounded-lg px-2.5 py-1">
                                    {tag}
                                </div>
                            ))}
                        </h6>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="text-para">{isReported ? "신고된 게시물입니다" : content}</p>
            </div>
            <div className="card-footer">
                <ul className="footer-element">
                    <li>
                        <a href={url}>링크 바로가기</a>
                    </li>
                    <li>
                        <a href="/reporting">신고하기</a>
                    </li>
                </ul>
            </div>
        </div>  
    );
} 
