import React, {useContext} from "react";
import { LanguageContext } from "./../../Context/Language"
import { movieDetails } from './../../APIs/details'
import { useState, useEffect } from "react";
import StarRating from './../MoviesList/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faHeart as NotLike } from "@fortawesome/free-regular-svg-icons";
import { faHeart as Like } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "./../../Store/Slices/watchlistSlice";

export default function MovieDetails() {
  const [moviesDetails, setmoviesDetails] = useState([])
  const [movieGenres, setMovieGenres] = useState([])
  const [movieLanguages, setMovieLanguage] = useState([])
  const [productionCompanies, setProductionCompanies] = useState([])
  const params = useParams()
  const watchlist = useSelector((state) => state.watchlist.movies);
  const dispatch = useDispatch()
  const { contextLanguage, setContextLanguage } = useContext(LanguageContext)

  const isMovieInWatchlist = watchlist.some((watchlistMovie) => watchlistMovie.id === moviesDetails.id);
  
  useEffect(() => {
    movieDetails(params.id, contextLanguage)
      .then((result) => {
        setmoviesDetails(result.data)
        setMovieGenres(result.data.genres)
        setMovieLanguage(result.data.spoken_languages)
        setProductionCompanies(result.data.production_companies)
      })
      .catch((error) => console.log(error));
    }, [params.id, contextLanguage]);

    const addToWatchlist = (event) => {
      event.stopPropagation();
      dispatch(addMovie(moviesDetails));
    };
  
    const removeFromWatchlist = (event) => {
      event.stopPropagation();
      dispatch(removeMovie(moviesDetails));
    };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Images */}
        <div className="col-lg-4 text-md-start text-center mb-lg-0 mb-4 p-0">
          <div className="main-image">
            <img src={`https://image.tmdb.org/t/p/w500/${moviesDetails.poster_path}`} className="rounded-2" height={500}/>
          </div>
        </div>
        {/* Details */}
        <div className="col-lg-8 text-start px-lg-5 px-0">
          <div className='d-flex justify-content-between'>
            <div>
              <h3 className="">{moviesDetails.original_title}</h3>
              <p className='text-secondary'>{moviesDetails.release_date}</p>
              <p className="text-dark mb-3 d-flex">
                <StarRating rating={moviesDetails.vote_average / 2}/> <span className='ms-4'>{moviesDetails.vote_count}</span>
              </p>
              <p className='my-3'>{moviesDetails.overview}</p>
            </div>
            <div>
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
            </div>
          </div>
          <div className="d-flex flex-wrap my-3">
            {movieGenres.map((genre) => {
              return(
                <p className='rounded-5 text-light px-3 py-1 me-3' style={{backgroundColor: 'var(--mainColor)'}}>{genre.name}</p>
              )
            })}
          </div>

          <div className="d-flex flex-wrap my-3">
            <p className='fs-5 me-lg-5 me-0'>
              <span className='fw-bold me-2'>Duration: </span>
              <span>{moviesDetails.runtime} Min</span>
            </p>
            <p className='fs-5 ms-lg-5 ms-0'>
              <span className='fw-bold me-2'>Languages: </span>
              {movieLanguages.map((language, index) => {
                if(index != movieLanguages.length - 1) {
                return (
                  <span>{language.english_name}, </span>
                )}
                else {
                return (
                  <span>{language.english_name}</span>
                )}
              })}
            </p>
          </div>

          <div className='d-flex flex-wrap my-3'>
            {
              productionCompanies.map((company) => {
                if(company.logo_path != null) {
                  return (
                    <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} className='me-4 mb-4' height={40}/>
                  )
                }
              })
            }
          </div>
          
          <div style={{ border:'1px solid var(--mainColor)', width:'fit-content'}} className=' rounded-5  py-1 px-3'>
            <a href={moviesDetails.homepage} className='text-decoration-none text-dark' target="_blank">Website <FontAwesomeIcon icon={faLink} className='fs-5' /></a>
          </div>

        </div>
      </div>
    </div>
  )     
}
