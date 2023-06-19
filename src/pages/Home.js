import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// components
import Header from "../components/Header";

// assets
import favs from "../assets/undraw_appreciation_dns0.svg";
import couch from "../assets/undraw_horror_movie_3988.svg";

// other packages
import { Badge, Tooltip } from "flowbite-react";
import { BsBalloonHeartFill } from "react-icons/bs";

const Home = () => {
  //  states to manage the search results
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  // states to manage favorites
  const [favorites, setFavorites] = useState([]);

  // states to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);

  // state to manage sorting
  const [sortOption, setSortOption] = useState("");

  // function to update favorites and save to local storage
  const updateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log("Favorites saved to local storage:", updatedFavorites);
  };

  // function to get favorites from the local storage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // API request function to search for a movie by the title
  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=3e36b5e3&s=${searchTitle}`
        );

        if (response.data && response.data.Search) {
          let searchResults = response.data.Search;

          if (sortOption === "year") {
            searchResults = searchResults.sort((a, b) =>
              a.Year.localeCompare(b.Year)
            );
          }
          setMovies(searchResults);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(error);
        setMovies([]);
      }
    };

    if (searchTitle) {
      searchMovies();
    } else {
      setMovies([]);
    }
  }, [searchTitle, sortOption]);

  // function to handle the onChange event in the search field
  const handleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  // function to handle the onChange event in the sort filter
  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  // function to add a movie to favorites
  const handleAddToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    updateFavorites(updatedFavorites);
  };

  // function to delete a movie from favorites
  const handleRemoveFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    updateFavorites(updatedFavorites);
  };

  // check if a movie is in favorites arrray
  const isFavorite = (movie) => {
    return favorites.some((favorite) => favorite.imdbID === movie.imdbID);
  };

  // pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      {/* header - navbar, searchbar */}
      <Header searchTitle={searchTitle} handleChange={handleChange} />

      <div className="px-10 lg:px-20 w-full py-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl text-amber-400">
            Search Results
          </h1>

          {/* sort filter */}
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
        </div>

        {/* search results */}
        {searchTitle && movies.length > 0 ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-10 gap-y-6 mt-5">
            {movies &&
              currentMovies.map((result) => (
                <div key={result.imdbID}>
                  <div className="h-60 overflow-hidden">
                    {/* movie poster image */}
                    <Link to={`/movies/${result.imdbID}`}>
                      <img
                        src={result.Poster}
                        alt={result.Title}
                        className="h-full w-full object-cover object-center"
                      />
                    </Link>
                  </div>

                  {/* movie title */}
                  <h3 className="text-amber-400 text-sm font-semibold">
                    {result.Title}
                  </h3>

                  <div className="flex items-center justify-between pt-2">
                    {/* year of release */}
                    <p className="text-white text-xs">{result.Year}</p>

                    {/* button to view the movie details */}
                    <Link to={`/movies/${result.imdbID}`}>
                      <Badge color="success" size="xs">
                        View details
                      </Badge>
                    </Link>
                  </div>

                  {/* add to or remove from favorites button */}
                  <div className="mt-2 flex">
                    {isFavorite(result) ? (
                      // icon button to remove a movie from favorites
                      <Tooltip content="Remove from favorites">
                        <BsBalloonHeartFill
                          size={20}
                          color="red"
                          onClick={() => handleRemoveFromFavorites(result)}
                        />
                      </Tooltip>
                    ) : (
                      // icon button to add a movie to your favorites
                      <Tooltip content="Add to favorites">
                        <BsBalloonHeartFill
                          size={20}
                          color="white"
                          onClick={() => handleAddToFavorites(result)}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : searchTitle && movies.length === 0 ? (
          // display if the search title and the movies length is 0, or a search is not complete
          <p className="text-white text-center">
            Still looking but nothing found yet...complete the search term or
            try again
          </p>
        ) : (
          // display when no search has been made or when the page loads for the first time
          <div className="mt-3 lg:mt-5 flex flex-col justify-center items-center">
            <img src={couch} alt="favs" className="w-32 h-32 lg:w-56 lg:h-56" />
            <p className="text-white">Please enter a movie title to search</p>
          </div>
        )}
      </div>

      {/* pagination */}
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

      {/* favorites */}
      <div className="px-10 lg:px-20 w-full py-5">
        <h1 className="font-semibold text-xl text-amber-400">Favorites</h1>

        {favorites.length > 0 ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-10 gap-y-6 mt-5">
            {/* dsiplay movies added to favorites */}
            {favorites.map((favorite) => (
              <div key={favorite.imdbID}>
                <div className="h-60 overflow-hidden">
                  {/* movie poster and link to view movie details */}
                  <Link to={`/movies/${favorite.imdbID}`}>
                    <img
                      src={favorite.Poster}
                      alt={favorite.Title}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>
                </div>

                {/* movie title */}
                <h3 className="text-amber-400 text-sm font-semibold">
                  {favorite.Title}
                </h3>

                <div className="flex items-center justify-between pt-2">
                  {/* year of release */}
                  <p className="text-white text-xs">{favorite.Year}</p>

                  {/* button to view the movie details */}
                  <Link to={`/movies/${favorite.imdbID}`}>
                    <Badge color="success" size="xs">
                      View details
                    </Badge>{" "}
                  </Link>
                </div>

                {/* icon button to remove a movie from favorites */}
                <div className="mt-2 flex">
                  <Tooltip content="Remove from favorites">
                    <BsBalloonHeartFill
                      size={20}
                      color="red"
                      onClick={() => handleRemoveFromFavorites(favorite)}
                    />
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // display when no favorites have been added
          <div className="mt-3 lg:mt-5 flex flex-col justify-center items-center">
            <img src={favs} alt="favs" className="w-32 h-32 lg:w-56 lg:h-56" />
            <p className="text-white">
              No favorites selected yet, search for a movie and click on the
              like button to add one{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
