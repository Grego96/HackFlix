import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./moreGenrePage.css";
import { Watch } from "react-loader-spinner";
import MovieCard from "../components/MovieCard";
import logo from "../7b7a104adea125644e0e8d62a7d53d0d.png";

const MoreGenrerPage = () => {
  const [moviesGenre, setMoviesGenre] = useState([]);
  const [page, setPage] = useState(2);
  let params = useParams();

  const getMoviesGenre = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${params.id}&page=${page}`
    );
    return result.data.results;
  };

  React.useEffect(() => {
    const getMoviesGenre = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${params.id}&page=1`
      );
      setMoviesGenre(result.data.results);
    };
    getMoviesGenre();
  }, []);

  const fetchdata = async () => {
    const getMoreMovies = await getMoviesGenre();
    setMoviesGenre([...moviesGenre, ...getMoreMovies]);
    setPage(page + 1);
  };

  return (
    <div className="main">
      <div className="title">
       
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        
      </div>
      <InfiniteScroll
        className="moreGenre"
        dataLength={moviesGenre.length}
        next={fetchdata}
        hasMore={true}
        loader={
          <div className="loading">
            <Watch
              height="80"
              width="80"
              radius="48"
              color="rgb(255, 115, 0)"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="more-genre container">
          <div className="row">
            {moviesGenre.map((movie) => {
              return (
                <div className="col-md-3">
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MoreGenrerPage;
