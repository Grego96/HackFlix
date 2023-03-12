import React from "react";
import "./navFinder.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import logo from "../7b7a104adea125644e0e8d62a7d53d0d.png";
import MovieCard from "./MovieCard";

let urlSearch;

const NavFinder = () => {
  const [moviesSerched, setMoviesSerched] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [average, setAverage] = useState(7);
  const [inputText, setInputText] = useState("");
  const [genres, setGenres] = useState([]);
  const [inputTextState, setInputTextState] = useState(false);
  const [inputCategoriesState, setInputCategoriesState] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  let vote_average_range = Number(average) + 1;

  const getMoviesSerched = async (url) => {
    const result = await axios({
      method: "get",
      baseURL: url,
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: inputText,
        "vote_average.gte": `${average}.0`,
        "vote_average.lte": vote_average_range,
        with_genres: checked.join(","),
        "vote_count.gte": 500,
      },
    });
    return result.data.results;
  };

  React.useEffect(() => {
    if (inputText) {
      urlSearch = "https://api.themoviedb.org/3/search/multi";
    } else {
      urlSearch = "https://api.themoviedb.org/3/discover/movie";
    }
    (async () => {
      const movies = await getMoviesSerched(urlSearch);
      setMoviesSerched(
        movies.filter((movie, index) => {
          return index < 4;
        })
      );
    })();
    console.log(moviesSerched);
  }, [
    inputText,
    inputTextState,
    average,
    checked,
  ]);

  const isNotEmptyOptions = (value) => {
    if (value) {
      setInputTextState(true);
    } else {
      setInputTextState(false);
    }
  };

  React.useEffect(() => {
    const getGenres = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setGenres(result.data.genres);
    };
    getGenres();
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="bg-trasparent nav-finder"
      >
        <Container>
          <Navbar.Brand href="#">React Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Contact</Nav.Link>
              <Nav.Link href="#action2">About us</Nav.Link>
            </Nav>
            <div className="d-flex">
              <button
                className="btn-search-movie"
                onClick={() => setLgShow(true)}
              >
                Search Movie
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={lgShow}
        size="xl"
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="search-modal"
      >
        <form action="/search" method="get" className="black-modal">
          <div className="titleModal">
            <h3>Find Movie</h3>
            <img className="logo-modal" src={logo} alt="" />
          </div>
          <input
            disabled={inputTextState}
            type="text"
            className="form-control"
            placeholder="movie name"
            name="movie_name"
            value={inputText}
            onChange={(e) => {
              setInputCategoriesState(e.target.value);
              setInputText(e.target.value);
            }}
          />
          <div className="vote_average">
            <label htmlFor="customRange" className="form-label">
              Vote average filter by {average}
            </label>
            <input
              disabled={inputCategoriesState}
              type="range"
              className="form-range"
              min="1"
              max="10"
              id="customRange"
              name="vote_average"
              value={average}
              onChange={(e) => setAverage(e.target.value)}
            />
          </div>
          <div className="genrers">
            <div className="row">
              <div className="col-12 col-xl-4 ">
                <div className="row">
                  {genres.map((genre) => {
                    return (
                      <div key={genre.id} className="col-6 col-lg-4 col-xl-6">
                        <input
                          disabled={inputCategoriesState}
                          type="checkbox"
                          id={genre.name}
                          name={genre.name}
                          value={genre.id}
                          onChange={(e) => {
                            isNotEmptyOptions(e.target.checked);
                            handleCheck(e);
                          }}
                        />
                        <label htmlFor={genre.name} className="mx-3">
                          {genre.name}
                        </label>
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-xl-8 col-md-12 d-none d-xl-block">
                <div className="modal-results row align-items-center h-100">
                  {moviesSerched.map((movie) => {
                    return (
                      <div key={movie.id} className="col-md-3">
                        <MovieCard movie={movie} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-search">
            <button className="btn-search-movie" type="submit">
              Search more results
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NavFinder;
