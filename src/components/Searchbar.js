import React from "react";

const Searchbar = ({ searchTitle, setSearchTitle }) => {
  return (
    <div className="text-white h-60 flex justify-center items-center px-20">
      <input
        type="search"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="search for a movie..."
        className="mb-5 mt-2 p-3 rounded-md border border-gray-400 focus:border-amber-400 focus:outline-none text-black w-full"
      />
    </div>
  );
};

export default Searchbar;
