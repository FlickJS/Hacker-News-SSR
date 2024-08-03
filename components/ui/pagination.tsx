"use client";

import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pageNumbers.push(i);
      } else if (
        i === currentPage - delta - 1 ||
        i === currentPage + delta + 1
      ) {
        pageNumbers.push("...");
      }
    }

    return Array.from(new Set(pageNumbers));
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="flex space-x-2 pt-10">
        {currentPage > 1 && (
          <li>
            <Link href={`/?page=${currentPage - 1}`} aria-label="Previous Page">
              <span className="px-3 py-2 cursor-pointer bg-gray-200 text-primary rounded">
                Previous
              </span>
            </Link>
          </li>
        )}
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <li
              key={index}
              className="px-3 py-2 cursor-default text-black rounded"
            >
              <span>...</span>
            </li>
          ) : (
            <li key={index}>
              <Link
                href={`/?page=${number}`}
                aria-label={`Page ${number}`}
                aria-current={number === currentPage ? "page" : undefined}
              >
                <span
                  className={`px-3 py-2 cursor-pointer ${
                    number === currentPage
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-primary"
                  } rounded`}
                >
                  {number}
                </span>
              </Link>
            </li>
          )
        )}
        {currentPage < totalPages && (
          <li>
            <Link href={`/?page=${currentPage + 1}`} aria-label="Next Page">
              <span className="px-3 py-2 cursor-pointer bg-gray-200 text-primary rounded">
                Next
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
