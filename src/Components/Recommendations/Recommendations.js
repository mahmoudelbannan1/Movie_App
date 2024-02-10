import React, {useContext} from "react";
import { LanguageContext } from "./../../Context/Language"
import { recommends } from './../../APIs/recommends'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from '../MoviesList/MovieCard';


export default function Recommendations() {
  const params = useParams()
  const [recommendsMovie, setRecommendsMovie] = useState([])
  const navigate = useNavigate()
  const { contextLanguage, setContextLanguage } = useContext(LanguageContext)

  useEffect(() => {
    recommends(params.id, contextLanguage)
      .then((result) => setRecommendsMovie(result.data.results))
      .catch((error) => console.log(error));
    }, [params.id, contextLanguage]);

    const redirectToDetails = (id) => {
      navigate(`/Details/${id}`)
    }
  return (
    <div>
      <h2 className='text-start my-5'>Recommendations</h2>
      {
      recommendsMovie.length != 0 ? 
        <div className="row row-cols-1 row-cols-lg-6 row-cols-md-2 g-4 justify-content-center align-items-center mb-5">
          {recommendsMovie.map((movie, index) => {
            while (index <= 5) {
              return (
                <div className="col d-flex justify-content-center align-items-center" key={movie.id}>
                  <MovieCard movie={movie} navigateDetail={(id) => redirectToDetails(id)}/>
                </div>
              );
            }
          })}
        </div>
        :
        <p className='mb-5 fw-medium fs-4 '>Sorry, I Havn't Any Recommends For You</p>
      }
    </div>    
  )
}