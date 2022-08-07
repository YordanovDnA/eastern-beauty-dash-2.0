import React, { useState } from "react";

export default function Pagination({ pagination, getData, setPagination }) {
  const prevPage = () => {
    let page = pagination.page >= 1 ? pagination.page - 1 : 0;
    getData(page);
    setPagination({
      ...pagination,
      page,
    });
  };

  const nextPage = () => {
    let page = pagination.page + 1;
    getData(page);
    setPagination({
      ...pagination,
      page,
    });
  };

  return (
    <>
      <div className="row justify-content-end">
        <div className="col-sm-3">
          <nav aria-label="Page navigation example">
            {pagination.totalPage ? (
              <>
                <ul className="pagination">
                  {pagination.page ? (
                    <li className="page-item">
                      <button className="page-link text-dark" onClick={prevPage}>
                        Previous
                      </button>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <button className="page-link bg-green">
                      <span className="pagination-text text-light">
                        {pagination.page + 1}
                      </span>
                      <span className="pagination-text text-light">/</span>
                      <span className="pagination-text text-light">
                        {pagination.totalPage}
                      </span>
                    </button>
                  </li>

                  {pagination.page + 1 >= pagination.totalPage ? (
                    ""
                  ) : (
                    <li className="page-item">
                      <button className="page-link text-dark" onClick={nextPage}>
                        Next
                      </button>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              ""
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
