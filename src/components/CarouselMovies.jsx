import "./carouselMovies.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import React, { useState } from "react";
import logo from "../7b7a104adea125644e0e8d62a7d53d0d.png";
import { Link } from "react-router-dom";

const CarouselMovies = () => {
  const [movies, setTopMovies] = useState([]);

  React.useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setTopMovies(movies.data.results);
    };
    getMovies();
  }, []);

  let popularMovies = movies.filter((item, index) => {
    return index < 10;
  });
  return (
    <div className="carrousel">
      <div className="titleContainer">
        <img src={logo} alt="" />
      </div>
      <Carousel variant="dark">
        {popularMovies.map((movie, index) => {
          return (
            <Carousel.Item key={index}>
              <div
                className="bgimg"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className="main_container">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 p-4 g-0">
                        <img
                          className="img-carousel d-block"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt="First slide"
                        />
                      </div>
                      <div className="col-md-8 g-0">
                        <div className="info d-none d-md-flex">
                          <div className="content">
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <p>original lenguaje: {movie.original_language}</p>
                            <p>release date: {movie.release_date}</p>
                            <Link
                              className="btn btn-outline-light"
                              to={`/movies/${movie.id}`}
                            >
                              More info
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselMovies;
