import { useState, useEffect } from "react";
//API
import API from '../API';

export const useMovieFetch= (movieID) =>{

  const [state,setState] = useState({});
  const [loading,setLoadig] = useState(true);
  const [error,setError] = useState(false);

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        setLoadig(true);
        setError(false);

        const movie = await API.fetchMovie(movieID);
        const credits = await API.fetchCredits(movieID);

        // get directors only
        const directors = credits.crew.filter(
          member=> member.job === 'Director'
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors
        });

        setLoadig(false);

      }
      catch(error){
        setError(true);
      }
    }

    fetchData();
  },[movieID]);

  return {state,loading,error};

}