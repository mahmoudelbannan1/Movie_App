import React from 'react'
import StarRating from './Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as NotLike } from "@fortawesome/free-regular-svg-icons"
import { faHeart as Like } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../../Store/Slices/watchlistSlice";

export default function MovieCard({ movie, navigateDetail }) {
  const watchlist = useSelector((state) => state.watchlist.movies);
  const dispatch = useDispatch()

  const isMovieInWatchlist = watchlist.some((watchlistMovie) => watchlistMovie.id === movie.id);

  const addToWatchlist = (event) => {
    event.stopPropagation();
    dispatch(addMovie(movie));
  };

  const removeFromWatchlist = (event) => {
    event.stopPropagation();
    dispatch(removeMovie(movie));
  };

  return (
    <div class="card border-0" onClick={() => navigateDetail(movie.id)}>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} class="card-img-top rounded-1" alt={movie.original_title}/>
      <div class="card-body px-0">
        <h5 class="card-title text-start">{movie.original_title.substr(0,15)}</h5>
        <p class="card-text p-0 text-start mb-2">
          <StarRating rating={movie.vote_average / 2} />
        </p>
        <p class="card-text d-flex justify-content-between m-0">
          <small class="text-body-secondary">{movie.release_date}</small>
          
            {
            isMovieInWatchlist
            ? 
            <span className="text-end px-3" style={{color: 'var(--mainColor)'}} onClick={removeFromWatchlist}>
              <FontAwesomeIcon icon={Like} className='fs-5' />
            </span>
            :
            <span className="text-end px-3" style={{color: 'var(--mainColor)'}} onClick={addToWatchlist}>
              <FontAwesomeIcon icon={NotLike} className='fs-5' />
            </span>
            }
        </p>
      </div>  
    </div>
  )
}
