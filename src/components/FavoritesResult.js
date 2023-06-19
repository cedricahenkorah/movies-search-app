import React from "react";
import { Link } from "react-router-dom";

// other packages and libraries
import { Badge, Tooltip } from "flowbite-react";
import { BsBalloonHeartFill } from "react-icons/bs";

const FavoritesResult = ({ favorites, handleRemoveFromFavorites }) => {
  return (
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
  );
};

export default FavoritesResult;
