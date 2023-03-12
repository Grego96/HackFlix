import React, { useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "./movieSingleGenre.css";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieSingleGender = ({ id, genreName }) => {
  const [movies, setMovies] = useState([]);

  React.useEffect(() => {
    const getMovies = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}&include_adult=false&vote_count.gte=500`
      );
      setMovies(result.data.results);
    };
    getMovies();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="genre">
      <h3 className="color-main genre-title">{genreName}</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        swipeable={true}
        draggable={true}
        renderButtonGroupOutside={true}
        centerMode={true}
      >
        {movies.map((movie) => {
          return (
            <MovieCard key={movie.id} movie={movie} />
          );
        })}
      </Carousel>
      <div className="more">
        <Link to={`/movies/genrers/${id}`} className="color-main">
          <h4 className="moreOfGenre btn btn-outline-light ">More</h4>
        </Link>
      </div>
    </div>
  );
};

export default MovieSingleGender;
