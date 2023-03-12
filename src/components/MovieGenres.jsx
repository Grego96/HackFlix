import React from "react";
import { useState } from "react";
import "./movieGenres.css";
import axios from "axios";
import MovieSingleGenrer from "./MovieSingleGenre";

import "react-multi-carousel/lib/styles.css";

const MovieGender = () => {
  const [genres, setGenres] = useState([]);

  React.useEffect(() => {
    const getGenres = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setGenres(result.data.genres);
      // console.log(result.data.genres);
    };
    getGenres();
  }, []);

  return (
    <div>
      {genres.map((genre) => {
        return <MovieSingleGenrer key={genre.id} id={genre.id} genreName={genre.name}/>;
      })}
    </div>
  );
};

export default MovieGender;
