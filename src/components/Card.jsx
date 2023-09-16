import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({ movie }) {
  const [fav, setFav] = useState(false);

  return (
    <article data-testid="movie-card" className="relative max-w-[250px] md:max-w-[500px] mx-auto">
      <div className="movie-poster">
        <div
          onClick={() => setFav(!fav)}
          className={`${
            fav ? "bg-red-500" : "bg-opacity-50 hover:bg-red-500"
          } absolute z-10 border border-red-500 p-1 rounded-full cursor-pointer top-4 right-4 transition duration-400 ease-in-out transform ${
            fav ? "scale-110" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            fill="none"
            viewBox="0 0 20 21"
          >
            <path
              fill={fav ? "#be123c" : "#F9FAFB"}
              fillRule="evenodd"
              d="M3.172 5.904c1.562-1.521 4.094-1.521 5.656 0L10 7.044l1.172-1.14c1.562-1.521 4.094-1.521 5.656 0a3.823 3.823 0 010 5.508L10 18.06l-6.828-6.65a3.823 3.823 0 010-5.507z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <Link
          to={{ pathname: `/movies/${movie.id}` }}
          state={{ movieId: movie.id }}
        >
          <img
            data-testid="movie-poster"
            className="filter brightness-[1.1] contrast-[1.1] transition duration-300 hover:brightness-[0.9] hover:contrast-[0.9]"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
      </div>
      <h4 data-testid="movie-title" className="text-lg mt-5">{movie.title}</h4>
      <div className="flex justify-between mt-1">
        <div className="flex text-xs">
          <h5 className="mr-1">Release Date:</h5>
          <p data-testid="movie-release-date">{movie.release_date}</p>
        </div>
        <div className="text-xs">
          <h5 className="mr-1">Vote:</h5>
          <p>{movie.vote_count}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
