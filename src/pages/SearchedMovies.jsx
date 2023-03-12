import React from "react";
import "./searchedMovies.css";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Watch } from "react-loader-spinner";
import logo from "../7b7a104adea125644e0e8d62a7d53d0d.png";
import MovieCard from "../components/MovieCard";

let urlSearch;

const SerchedMovies = () => {
  const [moviesSerched, setMoviesSerched] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [areMoreResults, setAreMoreResults] = useState(true);
  // const [urlSearch, setUrlSearch] = useState("");

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  let movieName = query.get("movie_name");
  let vote_average = query.get("vote_average");
  let vote_average_range = Number(vote_average) + 1;
  let year = query.get("year");

  let genrers = [
    query.get("Action"),
    query.get("Adventure"),
    query.get("Animation"),
    query.get("Comedy"),
    query.get("Crime"),
    query.get("Documentary"),
    query.get("Drama"),
    query.get("Family"),
    query.get("Fantasy"),
    query.get("History"),
    query.get("Horror"),
    query.get("Music"),
    query.get("Mystery"),
    query.get("Romance"),
    query.get("Science+Fiction"),
    query.get("TV+Movie"),
    query.get("Thriller"),
    query.get("War"),
    query.get("Western"),
  ];
  const genrersJoin = genrers
    .filter((x) => typeof x === "string" && x.length > 0)
    .join(",");

  const getMoviesSerched = async (url) => {
    const result = await axios({
      method: "get",
      baseURL: url,
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: movieName,
        "vote_average.gte": `${vote_average}.0`,
        "vote_average.lte": vote_average_range,
        with_genres: genrersJoin,
        page: pageNumber,
        "vote_count.gte": 500,
        primary_release_year: year
      },
    });
    setPageNumber(pageNumber + 1);
    return result.data;
  };

  React.useEffect(() => {
    if (movieName) {
      urlSearch = "https://api.themoviedb.org/3/search/multi";
    } else {
      urlSearch = "https://api.themoviedb.org/3/discover/movie";
    }
    (async () => {
      const movies = await getMoviesSerched(urlSearch);
      setMoviesSerched(movies.results);
      if (moviesSerched.length < movies.total_results) {
        setAreMoreResults(true);
      } else {
        setAreMoreResults(false);
      }
    })();
  }, []);

  const fetchdata = async () => {
    const getMoreMovies = await getMoviesSerched(urlSearch);
    setMoviesSerched([...moviesSerched, ...getMoreMovies.results]);
    if (moviesSerched.length < getMoreMovies.total_results) {
      setAreMoreResults(true);
    } else {
      setAreMoreResults(false);
    }
  };

  return (
    <>
      <div className="titleContainer">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="main">
        <InfiniteScroll
          className="moreGenre"
          dataLength={moviesSerched.length}
          next={fetchdata}
          hasMore={areMoreResults}
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
            <div className="noMore">
              <h4>there are no more movies</h4>
            </div>
          }
        >
          <div className="more-genre container">
            <div className="row">
              {moviesSerched.map((movie) => {
                return (
                  <div className="col-md-3">
                    <MovieCard movie={movie}/>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default SerchedMovies;
