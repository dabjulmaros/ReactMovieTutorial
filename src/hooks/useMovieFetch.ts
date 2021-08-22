import { useState, useEffect } from "react";
//API
import API,{Movie,Cast,Crew} from '../API';

//Helpers
import { isPersistedState } from "../helpers";


export type MovieState = Movie & {actors:Cast[],directors:Crew[]};

export const useMovieFetch= (movieID:string) =>{

  const [state,setState] = useState<MovieState>({} as MovieState);
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

    const sessionState = isPersistedState(movieID);
    if(sessionState){
      console.log("Getting from storage");
      setState(sessionState);
      setLoadig(false);
      return;
    }
      
    console.log("Getting from API");
    fetchData();
  },[movieID]);

  //Write to Storage
  useEffect(()=>{
    sessionStorage.setItem(movieID,JSON.stringify(state));
  },[state,movieID])

  return {state,loading,error};

}