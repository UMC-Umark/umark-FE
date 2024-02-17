import React from 'react';
//import leftArrowIcon from '../img/arrow-left.png';
//import rightArrowIcon from '../img/arrow-right.png';
import './Pagination.css';

function Pagination ({ pageNumber, totalPages, limit, setPageNumber }){
    const numPages = Math.ceil(totalPages/limit);
    const firstNum = pageNumber - (pageNumber % 5) + 1;
    const lastNum = pageNumber - (pageNumber % 5) + 5;

    const renderButtons = () => {
      const buttons = [];
      for (let i = firstNum; i <= lastNum; i++) {
        if (i <= totalPages) {
          buttons.push(
            <button className='page-button' 
              key={i} 
              onClick={() => setPageNumber(i)}
              aria-current={pageNumber === i ? "pageNumber" : null}
            >
              {i}
            </button>
          );
        }
      }
      return buttons;
    };

    return (
        <div className='pagination flex justify-center items-center gap-1 m-4'>
            <div className='button-wrap'>
                <button className='arrow-button'
                    onClick={() => {setPageNumber(pageNumber-1);}} 
                    disabled={pageNumber === 1}
                >
                  {"<"} 
                </button>
                {renderButtons()}
                <button className='arrow-button'
                    onClick={() => {setPageNumber(pageNumber+1);}} 
                    disabled={pageNumber === numPages}
                >
                  {">"}
                </button>
            </div>
        </div>
    );
}

export default Pagination;
