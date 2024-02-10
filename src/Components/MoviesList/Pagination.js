import React from 'react'
import './Pagination.css'

export default function Pagination({ currentPage, onPageChange, totalPages }) {

    const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i > 10 ) break;
        pageNumbers.push(
          <li className="page-item">
            <button key={i}
              onClick={() => onPageChange(i)}
              className={currentPage === i ? "pageNumber page-link  border-0  active  " : "pageNumber border-0 page-link " } style={{color: 'var(--mainColor)'}}>{i}
            </button>
          </li>
        );
      }
      return pageNumbers;
    };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center my-5">
        <li className="page-item">
          <button className="page-link border-0" style={{color: 'var(--mainColor)'}} aria-label="Previous" disabled={currentPage == 1} onClick={() => onPageChange(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {renderPageNumbers()}
        <li className="page-item">
          <button className="page-link border-0" style={{color: 'var(--mainColor)'}} aria-label="Next" disabled={currentPage == 10} onClick={() => onPageChange(currentPage + 1)}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>  
  )
}