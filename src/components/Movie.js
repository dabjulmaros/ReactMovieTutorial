import React from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
//Hook
import { useMovieFetch } from '../hooks/useMovieFetch';

//Image
import NoImage from '../images/no_image.jpg'

const Movie = () => {
  const {movieID} = useParams();
  const {state: movie,loading, error} = useMovieFetch(movieID);

  if(loading) return <Spinner/>;

  if(error) return <div>Something Went Wrong</div>;

  return(
    <>
      <BreadCrumb movieTitle={movie.original_title}/>
    </>
  )
}

export default Movie;