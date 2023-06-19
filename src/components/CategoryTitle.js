import React from "react";

// Title for categories - search results & favorites
const CategoryTitle = ({ title }) => {
  return (
    <div>
      <h1 className="font-semibold lg:text-xl text-lg text-amber-400">
        {title}
      </h1>
    </div>
  );
};

export default CategoryTitle;
