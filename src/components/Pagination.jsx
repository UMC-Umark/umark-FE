import React from 'react';
import leftArrowIcon from '../img/arrow-left.png';
import rightArrowIcon from '../img/arrow-right.png';
import './Pagination.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="pagination">
      <button 
        className={currentPage === 1 ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <img src={leftArrowIcon} alt="Previous" />
      </button>
      {pages.map(page => (
        <button 
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      <button 
        className={currentPage === totalPages ? 'disabled' : ''}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <img src={rightArrowIcon} alt="Next" />
      </button>
    </div>
  );
}

export default Pagination;
