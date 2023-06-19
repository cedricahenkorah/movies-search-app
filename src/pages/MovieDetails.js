import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// assets
import Navbar from "../components/Navbar";

// other packages and libraries
import axios from "axios";
import { Levels } from "react-activity";
import "react-activity/dist/library.css";

// components
import Poster from "../components/Poster";
import Details from "../components/Details";

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
          <Poster movieDetails={movieDetails} />

          {/* details */}
          <Details movieDetails={movieDetails} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
