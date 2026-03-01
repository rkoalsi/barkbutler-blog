import Link from "next/link";
import React from "react";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  const baseLink = section ? `/${section}` : "";
  const pageLink = (n) =>
    n === 1 ? `${baseLink || "/"}` : `${baseLink}/page/${n}`;

  const btnBase =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors";
  const btnActive = `${btnBase} bg-primary text-white`;
  const btnInactive = `${btnBase} border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 dark:hover:text-primary dark:hover:border-primary`;
  const btnNav =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg border text-sm transition-colors";

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-2 py-4"
          aria-label="Pagination"
        >
          {/* Previous */}
          {hasPrevPage ? (
            <Link
              href={indexPageLink ? pageLink(1) : pageLink(currentPage - 1)}
              passHref
            >
              <a className={`${btnNav} border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </Link>
          ) : (
            <span className={`${btnNav} border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          )}

          {/* Page numbers */}
          {pageList.map((n) => (
            <React.Fragment key={`page-${n}`}>
              {n === currentPage ? (
                <span aria-current="page" className={btnActive}>
                  {n}
                </span>
              ) : (
                <Link href={pageLink(n)} passHref>
                  <a className={btnInactive}>{n}</a>
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* Next */}
          {hasNextPage ? (
            <Link href={pageLink(currentPage + 1)} passHref>
              <a className={`${btnNav} border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </Link>
          ) : (
            <span className={`${btnNav} border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-700 cursor-not-allowed`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
