import React from "react";

// search bar to search for movies
const Searchbar = ({ searchTitle, handleChange }) => {
  return (
    <div className="text-white h-40 flex justify-center items-center px-10 lg:px-20">
      <input
        type="search"
        value={searchTitle}
        onChange={handleChange}
        placeholder="search for a movie..."
        className="mb-5 mt-2 p-3 rounded-md border border-gray-400 focus:border-amber-400 focus:outline-none text-black w-full"
      />
    </div>
  );
};

export default Searchbar;
