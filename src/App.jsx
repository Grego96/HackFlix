import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// import Home from "./pages/Home";
// import SingleMoviePage from "./pages/SingleMoviePage";
// import MoreGenrerPage from "./pages/MoreGenrePage";
// import SerchedMovies from "./pages/SearchedMovies"
// import Error404 from "./components/Error404";

const Home = lazy(() => import("./pages/Home"));
const SingleMoviePage = lazy(() => import("./pages/SingleMoviePage"));
const MoreGenrerPage = lazy(() => import("./pages/MoreGenrePage"));
const SerchedMovies = lazy(() => import("./pages/SearchedMovies"));
const Error404 = lazy(() => import("./components/Error404"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<SingleMoviePage />} />
          <Route path="/movies/genrers/:id" element={<MoreGenrerPage />} />
          <Route path="/search" element={<SerchedMovies />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
