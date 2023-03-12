import React from "react";
import { Link } from "react-router-dom";
import "./movieCard.css";

const MovieCard = ({ movie }) => {
  return (
      <div className="movie-card " key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt=""
        />
        <div className="info-card">
          <h6>{movie.title}</h6>
          <p>{movie.vote_average}</p>
          <Link className="btn btn-outline-light" to={`/movies/${movie.id}`}>
            More info
          </Link>
        </div>
      </div>
  );
};

export default MovieCard;
