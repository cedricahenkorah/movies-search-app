import React from "react";

// sort filter
const SortFilter = ({ sortOption, handleSortOptionChange }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div>
        <select
          className="p-1 rounded-md border border-gray-400 focus:border-amber-400 focus:outline-none text-black w-full"
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value="">Sort by:</option>
          <option value="year">Year</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
