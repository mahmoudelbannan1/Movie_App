import React, { useContext } from "react";
import { movieList } from "./../../APIs/movies";
import { moviePage } from "../../APIs/moviesPages";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { LanguageContext } from "./../../Context/Language";

export default function MovieList() {
  const [moviesList, setMoviesList] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { contextLanguage, setContextLanguage } = useContext(LanguageContext);

  useEffect(() => {
    movieList(contextLanguage)
      .then((result) => setMoviesList(result.data.results))
      .catch((error) => console.log(error));
  }, [contextLanguage]);

  useEffect(() => {
    moviePage(currentPage, contextLanguage)
      .then((result) => {
        setMoviesList(result.data.results);
      })
      .catch((error) => console.log(error));
  }, [currentPage, contextLanguage]);

  const handelMovieName = (event) => {
    setMovieName(event.target.value);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    if (movieName != "") {
      navigate(`/Search/${movieName}`);
    }
  };

  const redirectToDetails = (id) => {
    navigate(`/Details/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      {/* <div style={{ direction: `${LanguageContext == "en" ? "ltr" : "rtl"}` }}> */}
      <div className="search-part bg-body-secondary my-5 p-5 rounded rounded-1 ">
        <h1 className="text-start mb-3">Welcome To Our Movie App</h1>
        <p className="text-start mb-3">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form className="input-group" onSubmit={(event) => handelSubmit(event)}>
          <input
            type="search"
            class="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={movieName}
            name="movieName"
            onChange={(event) => handelMovieName(event)}
          />
          <button
            type="submit"
            class="btn text-light"
            style={{ backgroundColor: "var(--mainColor)" }}
          >
            search
          </button>
        </form>
      </div>
      <div className="movies">
        <h3 className="text-start mb-5">Popular Movies</h3>
        <div className="row row-cols-1 row-cols-lg-6 row-cols-md-2 g-4 justify-content-center align-items-center">
          {moviesList.map((movie) => {
            return (
              <div
                className="col d-flex justify-content-center align-items-center"
                key={movie.id}
              >
                <MovieCard
                  movie={movie}
                  navigateDetail={(id) => redirectToDetails(id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={10}
        />
      </div>
      {/* </div> */}
    </>
  );
}
