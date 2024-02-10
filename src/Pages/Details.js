import React from 'react'
import MoviesDetails from './../Components/MovieDetails/MovieDetails'
import Recommendations from '../Components/Recommendations/Recommendations'

export default function Details() {
  return (
    <div>
        <MoviesDetails />
        <hr />
        <Recommendations />
    </div>
  )
}