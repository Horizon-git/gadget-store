import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchWith';

import './Pagination.scss';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = Math.ceil(total / +perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pageCount;

  const handlePageChange = (pageNumber: number) => {
    return getSearchWith(searchParams, {
      page: String(pageNumber) || null,
    });
  };

  const MAX_VISIBLE_PAGES = 5;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(currentPage - half, 1);
    let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, pageCount);

    if (pageCount <= MAX_VISIBLE_PAGES) {
      startPage = 1;
      endPage = pageCount;
    } else if (currentPage <= half) {
      startPage = 1;
      endPage = MAX_VISIBLE_PAGES;
    } else if (currentPage >= pageCount - half) {
      startPage = pageCount - MAX_VISIBLE_PAGES + 1;
      endPage = pageCount;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div>
        <Link
          data-cy="prevLink"
          className={classNames('pagination__link', { disabled: firstPage })}
          aria-disabled={firstPage}
          to={{
            search: !firstPage ? handlePageChange(currentPage - 1) : undefined,
          }}
        >
          {'<'}
        </Link>
      </div>

      <div className="pagination__pages">
        {currentPage > 1 && (
          <div className="pagination__item">
            <Link
              className="pagination__link"
              to={{ search: handlePageChange(1) }}
            >
              1
            </Link>
          </div>
        )}
        {currentPage > MAX_VISIBLE_PAGES / 2 && (
          <div className="pagination__dots">...</div>
        )}
        {getPageNumbers().map(pageNumber => {
          if (
            (pageNumber === 1 && currentPage !== 1) ||
            (pageNumber === pageCount && currentPage !== pageCount)
          ) {
            return undefined;
          }

          return (
            <div
              key={pageNumber}
              className={classNames('pagination__item', {
                active: pageNumber === currentPage,
              })}
            >
              <Link
                className={classNames('pagination__link', {
                  active: pageNumber === currentPage,
                })}
                to={{
                  search:
                    currentPage !== pageNumber
                      ? handlePageChange(pageNumber)
                      : undefined,
                }}
              >
                {pageNumber}
              </Link>
            </div>
          );
        })}
        {currentPage < pageCount - 1 && (
          <div className="pagination__dots">...</div>
        )}
        {currentPage < pageCount && (
          <div className="pagination__item">
            <Link
              className="pagination__link"
              to={{ search: handlePageChange(pageCount) }}
            >
              {pageCount}
            </Link>
          </div>
        )}
      </div>

      <div>
        <Link
          data-cy="nextLink"
          className={classNames('pagination__link', { disabled: lastPage })}
          aria-disabled={lastPage}
          to={{
            search: !lastPage ? handlePageChange(currentPage + 1) : undefined,
          }}
        >
          {'>'}
        </Link>
      </div>
    </div>
  );
};
