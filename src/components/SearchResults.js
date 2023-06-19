import React from "react";
import { Link } from "react-router-dom";

// other packages and libraries
import { Badge, Tooltip } from "flowbite-react";
import { BsBalloonHeartFill } from "react-icons/bs";

const SearchResults = ({
  movies,
  currentMovies,
  isFavorite,
  handleAddToFavorites,
  handleRemoveFromFavorites,
}) => {
  return (
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
  );
};

export default SearchResults;
