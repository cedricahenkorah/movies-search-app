import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import Header from "../components/Header";

// assets
import favs from "../assets/undraw_appreciation_dns0.svg";
import couch from "../assets/undraw_horror_movie_3988.svg";

// other packages and libraries
import CategoryTitle from "../components/CategoryTitle";
import SortFilter from "../components/SortFilter";
import Pagination from "../components/Pagination";
import SearchResults from "../components/SearchResults";
import FavoritesResult from "../components/FavoritesResult";
import NotCompleteMessage from "../components/NotCompleteMessage";

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
          <CategoryTitle title="Search Results" />

          {/* sort filter */}
          <SortFilter
            sortOption={sortOption}
            handleSortOptionChange={handleSortOptionChange}
          />
        </div>

        {/* search results */}
        {searchTitle && movies.length > 0 ? (
          <SearchResults
            movies={movies}
            currentMovies={currentMovies}
            isFavorite={isFavorite}
            handleAddToFavorites={handleAddToFavorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
          />
        ) : searchTitle && movies.length === 0 ? (
          // display if the search title and the movies length is 0, or a search is not complete
          <p className="text-white text-center mt-3 lg:mt-5">
            Still looking but nothing found yet...complete the search term or
            try again
          </p>
        ) : (
          // display when no search has been made or when the page loads for the first time
          <NotCompleteMessage
            image={couch}
            message="Please enter a movie title to search"
          />
        )}
      </div>

      {/* pagination */}
      <Pagination
        movies={movies}
        moviesPerPage={moviesPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* favorites */}
      <div className="px-10 lg:px-20 w-full py-5">
        <CategoryTitle title="Favorites" />

        {favorites.length > 0 ? (
          <FavoritesResult
            favorites={favorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
          />
        ) : (
          // display when no favorites have been added
          <NotCompleteMessage
            image={favs}
            message="No favorites selected yet, search for a movie and click on the
          like button to add one"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
