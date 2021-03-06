import React from 'react';

import PropTypes from 'prop-types';

const PaginationComponent = (props) => {
  const pageCount = Math.ceil(props.totalItemsCount / props.itemsPerPage);
  const numeration = Array.from({ length: pageCount }, (v, k) => k + 1);

  const pageNumbers = numeration.reduce((acc, currNumber) => {
    acc.push(
      <li className="page-item" onClick={() => props.changePageNumber(currNumber)} key={currNumber}>
        <a className="page-link">{currNumber}</a>
      </li>,
    );

    return acc;
  }, []);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pageNumbers}
      </ul>
    </nav >
  );
};

PaginationComponent.propTypes = {
  totalItemsCount: PropTypes.number,
  itemsPerPage: PropTypes.number.isRequired,
};

export default PaginationComponent;
