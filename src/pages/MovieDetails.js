import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// assets
import Navbar from "../components/Navbar";

// other packages and libraries
import axios from "axios";
import { Levels } from "react-activity";
import "react-activity/dist/library.css";
import { IoIosPeople } from "react-icons/io";
import { Button } from "flowbite-react";

const MovieDetails = () => {
  // get id from movie
  const { imdbID } = useParams();

  // state to manage the details of the movie
  const [movieDetails, setMovieDetails] = useState(null);

  // function to fetch the details of the movie from the api
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=3e36b5e3&i=${imdbID}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  // if there are o details yet or the page is loading return this
  if (!movieDetails) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <Levels size={50} className="text-amber-400" />
        <h1 className="text-amber-400 font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {/* navbar */}
      <Navbar />

      {/* movie details */}
      <div className="w-full px-10 lg:px-20">
        <div className="flex gap-x-10 flex-col lg:flex-row">
          {/* movie poster */}
          <div className="w-full xl:w-2/6 lg:h-[550px] h-[450px]">
            {/* movie poster image */}
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="w-full h-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </div>

          {/* movie details */}
          <div className="w-full xl:w-4/6 mt-5 lg:mt-0">
            <div className="flex items-center lg:gap-x-5 gap-x-3">
              {/* release date */}
              <p className="text-sm text-indigo-600">{movieDetails.Released}</p>

              {/* director */}
              <div className="flex items-center text-base text-gray-400">
                <h1> Directed by</h1>

                <p className="ml-2 text-white underline underline-offset-4 leading-7 text-base">
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
                <h1 className="text-amber-400 font-semibold ml-2 text-base">
                  Cast:
                </h1>
              </div>

              <p className=" text-white text-base">{movieDetails.Actors}</p>
            </div>

            {/* genre */}
            <div className="mt-3 flex flex-col">
              <div className="flex items-center">
                <h1 className="text-amber-400 font-semibold text-base">
                  Genre:
                </h1>
              </div>

              <p className=" text-white text-base">{movieDetails.Genre}</p>
            </div>

            {/* writer */}
            <div className="mt-3 flex flex-col">
              <div className="flex items-center">
                <h1 className="text-amber-400 font-semibold text-base">
                  Writer(s):
                </h1>
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
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
