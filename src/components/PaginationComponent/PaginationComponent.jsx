import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import styles from './PaginationComponent.css';

const PaginationComponent = (props) => {
  const pageCount = Math.ceil(props.totalItemsCount / props.itemsPerPage);
  const numeration = Array.from({ length: pageCount }, (v, k) => k + 1);

  const pageNumbers = numeration.reduce((acc, currNumber) => {
    acc.push(
      <PaginationItem onClick={() => props.fetchPageInfo(currNumber)} key={currNumber}>
        <PaginationLink>{currNumber}</PaginationLink>
      </PaginationItem>,
    );

    return acc;
  }, []);

  return (
    <div>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink previous/>
        </PaginationItem>
        {pageNumbers}
        <PaginationItem>
          <PaginationLink next/>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
