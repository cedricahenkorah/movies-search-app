import React from "react";

// pagination for search results
const Pagination = ({ movies, moviesPerPage, paginate, currentPage }) => {
  return (
    <div className="mt-5 flex justify-center">
      {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map(
        (_, index) => (
          <button
            key={index}
            className={`mx-1 px-2 py-1 rounded ${
              currentPage === index + 1 ? "bg-amber-400" : "bg-gray-300"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
