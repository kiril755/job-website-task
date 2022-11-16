import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";

import leftArrow from "../assets/Arrow left.svg";

function PaginatedItems({ itemsPerPage, jobDetailData, renderPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(jobDetailData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(jobDetailData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  useEffect(() => {
    console.log(currentItems);
    renderPerPage(currentItems);
  }, [currentItems]);

  console.log(jobDetailData);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jobDetailData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel=""
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="previous-page-item"
        previousLinkClassName="page-link"
        nextClassName="next-page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;

// Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById("container")
// );
