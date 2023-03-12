import React from "react";
import CarouselMovies from "../components/CarouselMovies";
import NavFinder from "../components/NavFinder";
import MovieGenrers from "../components/MovieGenres";
import "./home.css";

function Home() {
  return (
    <div className="Home">
      <CarouselMovies />
      <div className="bg-custom">
        <NavFinder />
        <div className=" bg-custom">
          <MovieGenrers />
        </div>
      </div>
    </div>
  );
}

export default Home;
