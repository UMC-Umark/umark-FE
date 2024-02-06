//Card.jsx

import React, { useState } from "react";
import './Card.css';
import BookmarkOff from '../img/BookmarkOff.png';
import BookmarkOn from '../img/BookmarkOn.png';
import axios from 'axios';

export default function Card({ bookMarkId, title, date, tags, description, link, onClick }) {
    const [liked, setLiked] = useState(false)

    const addBookmark = async (e) => {
        try {
            const response = await axios.post(`/bookmarks/${bookMarkId}/likes?memberId=1`)
            console.log(response);
            setLiked(!liked);
            onClick(true);
        } catch(error) {
            console.error('Error sending POST request:', error);
        }
    }

    const deleteBookmark = async (e) => {
        try {
            const response = await axios.post(`/bookmarks/${bookMarkId}/likes?memberId=1`)
            console.log(response);
            setLiked(!liked);
            onClick(false);
        } catch(error) {
            console.error('Error sending POST request:', error);
        }
    }

    
    return (
        <div className="card">
            <div className="card-header">
                <div className="header-wrap">
                    <h4>{title}</h4>
                    <div>
                        <img className="card-img-top" 
                            src={liked? BookmarkOn : BookmarkOff}
                            onClick={() => {
                                if(liked === true) {
                                    deleteBookmark({bookMarkId: 1});
                                }
                                
                                if(liked === false) {
                                    addBookmark({bookMarkId: 1});
                                }
                            }}
                            alt="bookMarkIcon"
                        />
                    </div>
                    <div className="flex flex-col">
                        <time className="text-gray-400">
                            {date}
                        </time>
                        <h6 className="flex items-center gap-x-4">
                            {tags.map((tag) => (
                                <div className="tags relative rounded-lg px-2.5 py-1">
                                    #{tag}
                                </div>
                            ))}
                        </h6>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="text-para">{description}</p>
            </div>
            <div className="card-footer">
                <ul className="footer-element">
                    <li>
                        <a href={link}>링크 바로가기</a>
                    </li>
                    <li>
                        <a href="/reporting">신고하기</a>
                    </li>
                </ul>
            </div>
        </div>  
    );
}