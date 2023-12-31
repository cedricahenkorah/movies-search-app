import React from "react";

// other packages and libraries
import { IoIosPeople } from "react-icons/io";
import { Button } from "flowbite-react";

const Details = ({ movieDetails }) => {
  return (
    <div className="w-full xl:w-4/6 mt-5 lg:mt-0">
      <div className="flex items-center lg:gap-x-5 gap-x-3">
        {/* release date */}
        <p className="text-sm text-indigo-600">{movieDetails.Released}</p>

        {/* director */}
        <div className="flex items-center lg:text-base text-xs text-gray-400">
          <h1> Directed by</h1>

          <p className="ml-1 lg:ml-2 text-white underline underline-offset-4 leading-7 lg:text-base text-xs">
            {movieDetails.Director}
          </p>
        </div>
      </div>

      {/* movie title */}
      <p className="mt-2 text-2xl font-bold tracking-tight text-amber-400 sm:text-4xl">
        {movieDetails.Title}
      </p>

      {/* plot */}
      <p className="mt-6 lg:text-lg text-base leading-8 text-white">
        {movieDetails.Plot}
      </p>

      {/* cast */}
      <div className="mt-10 flex flex-col">
        <div className="flex items-center">
          <IoIosPeople className="text-amber-400" size={25} />
          <h1 className="text-amber-400 font-semibold ml-2 text-base">Cast:</h1>
        </div>

        <p className=" text-white text-base">{movieDetails.Actors}</p>
      </div>

      {/* genre */}
      <div className="mt-3 flex flex-col">
        <div className="flex items-center">
          <h1 className="text-amber-400 font-semibold text-base">Genre:</h1>
        </div>

        <p className=" text-white text-base">{movieDetails.Genre}</p>
      </div>

      {/* writer */}
      <div className="mt-3 flex flex-col">
        <div className="flex items-center">
          <h1 className="text-amber-400 font-semibold text-base">Writer(s):</h1>
        </div>

        <p className="text-white text-base">{movieDetails.Writer}</p>
      </div>

      {/* ratings */}
      <div className="mt-5">
        <h1 className="underline underline-offset-4 text-gray-300 text-base">
          Imdb Ratings
        </h1>
        <Button gradientDuoTone="purpleToBlue" className="mt-3" size="xs">
          {movieDetails.imdbRating}
        </Button>
      </div>

      {/* movie runtime */}
      <div className="mt-3">
        <p className="text-gray-400 text-xs">{movieDetails.Runtime}</p>
      </div>
    </div>
  );
};

export default Details;
