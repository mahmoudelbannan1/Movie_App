import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MovieCard from "./../MoviesList/MovieCard";
import emptyWatchList from "./../../Assets/Images/empty_wishlist.png";

export default function Watchlist() {
  const watchlist = useSelector((state) => state.watchlist.movies);
  const navigate = useNavigate();

  const redirectToDetails = (id) => {
    navigate(`/Details/${id}`);
  };

  return (
    <div className="container py-5">
      <h1 className="text-start">Watchlist</h1>
      <hr />
      {watchlist.length !== 0 ? (
        <>
          <div className="row row-cols-1 row-cols-lg-6 row-cols-md-2 g-4 justify-content-center align-items-center">
            {watchlist.map((movie) => {
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
        </>
      ) : (
        <div className="d-flex flex-column  justify-content-center align-items-center text-secondary py-5">
          <img src={emptyWatchList} width={200} className="mb-5" alt="..." />
          <h3>No Movies In Watch List</h3>
          <button
            className="btn mt-3 text-white"
            style={{ backgroundColor: "var(--mainColor)" }}
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>
        </div>
      )}
    </div>
  );
}
