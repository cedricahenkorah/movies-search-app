import React from "react";

const Poster = ({ movieDetails }) => {
  return (
    <div className="w-full xl:w-2/6 lg:h-[550px] h-[450px]">
      {/* movie poster image */}
      <img
        src={movieDetails.Poster}
        alt={movieDetails.Title}
        className="w-full h-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
      />
    </div>
  );
};

export default Poster;
