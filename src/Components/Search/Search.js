import React, {useContext} from "react";
import { LanguageContext } from "./../../Context/Language"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { search, searchPages } from '../../APIs/search'
import { useState, useEffect } from "react";
import MovieCard from '../MoviesList/MovieCard';
import notFoundImage from '../../Assets/Images/search.jpg'
import Pagination from "./../MoviesList/Pagination"

export default function SearchMovies() {
  const params = useParams()
  const [searchResult, setSearchResult] = useState([])
  const [searchParams, setSearchParams] = useState(params.name)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()
  const { contextLanguage, setContextLanguage } = useContext(LanguageContext)

  useEffect(() => {
    search(params.name, contextLanguage)
      .then((result) => setSearchResult(result.data.results))
      .catch((error) => console.log(error));
    }, [params.name, contextLanguage]);

    useEffect(() => {
      searchPages(params.name, currentPage, contextLanguage)
      .then((result) => {
        setSearchResult(result.data.results)
        setTotalPages(result.data.total_pages)
      })
      .catch((error) => console.log(error));
    }, [currentPage, params.name, contextLanguage]);

    const redirectToDetails = (id) => {
      navigate(`/Details/${id}`)
    }

    const handelSearchParams = (event) => {
      setSearchParams(event.target.value)
      console.log(event.target.value)
    }
  
    const handelSubmit = (event) => {
      event.preventDefault()
      if(searchParams != '') {
        navigate(`/Search/${searchParams}`)
      }
    }

    const handlePageChange = (pageNumber) => {
      if (pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
      }
    };
  return (
    <>
      <div className='search-part bg-body-secondary my-5 rounded rounded-1 ' >
        <form className='input-group' onSubmit={(event) => handelSubmit(event)}>
          <input type="search" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchParams} name="movieName" onChange={(event) => handelSearchParams(event)} />
          <button type="submit" class="btn text-light" style={{backgroundColor: 'var(--mainColor)'}}>search</button>
        </form>
      </div>
      <div className='my-5 text-start '>
        <h4>Search Result For: <span className='fw-normal '>{searchParams}</span></h4>
      </div>
      {
      searchResult.length != 0 ? 
      <>
        <div className="row row-cols-1 row-cols-lg-6 row-cols-md-2 g-4 justify-content-center align-items-center">
          {searchResult.map((movie) => {
            return (
              <div className="col d-flex justify-content-center align-items-center" key={movie.id}>
                <MovieCard movie={movie} navigateDetail={(id) => redirectToDetails(id)}/>
              </div>
            );
          })}
        </div> 
        <div className='text-center'>
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div> 
      </>
      : 
      <div className='d-flex flex-column  justify-content-center align-items-center text-secondary '>
        <h3>Sorry We Couldn't Found Any Result</h3>
        <img src={notFoundImage} width={400}/>
      </div>
      }
    </>
     
  )
}