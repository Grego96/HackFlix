import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./singleMoviePage.css";
import MyVerticallyCenteredModal from "../components/ModalSinglePage";
import { Rating } from "react-simple-star-rating";
import Error404 from "../components/Error404";
import logo from "../7b7a104adea125644e0e8d62a7d53d0d.png";

const SingleMoviePage = () => {
  const [movie, setMovie] = useState([]);
  const [videoKey, setVideoKey] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [areData, setAreData] = useState(true);

  let params = useParams();

  React.useEffect(() => {
    const getMovie = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setAreData(true);
        setMovie(result.data);
      } catch (error) {
        console.log(error);
        setAreData(false);
      }
    };
    getMovie();
    const getMovieKey = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      console.log(result.data);
      const keyVideo = result.data.results.find(
        (movie) => movie.type === "Trailer"
      );
      setVideoKey(keyVideo.key);
    };
    getMovieKey();
  }, []);

  return (
    <>
      {areData ? (
        <div
          className="bgimg-sp"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        >
          <div className="main_container-sp">
            <div className="title">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="carousel-body container h-100">
              <div className="row d-flex align-items-center h-100">
                <img
                  className="img-carousel-sp col-md-4 d-block"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="First slide"
                />
                <div className="info-sp col-md-8 d-md-flex">
                  <div className="content-sp">
                    <h2 className="titlemovie-sp">{movie.title}</h2>
                    <div className="rating-icons">
                      <Rating
                        size={35}
                        allowHover={false}
                        initialValue={movie.vote_average / 2}
                        fillColor="#DB202C"
                      />
                    </div>
                    <p className="fs-3">{movie.overview}</p>
                    <pre>original lenguaje: {movie.original_language}</pre>
                    <pre>release date: {movie.release_date}</pre>
                    <h5>Genres:</h5>

                    {movie.genres &&
                      movie.genres.map((genre) => {
                        return (
                          <pre className="d-inline" key={genre.id}>
                            {genre.name}{" "}
                          </pre>
                        );
                      })}
                    <div className="more-sp">
                      <button
                        className="color-main moreOfGenre-sp btn btn-outline-light"
                        onClick={() => setModalShow(true)}
                      >
                        Watch trailer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            videoKey={videoKey}
          />
        </div>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default SingleMoviePage;
