import {useState, useEffect, useRef} from 'react';

// API
import API from '../API';

// Helper
import { isPersistedState } from '../helpers';

const initialState = {
  page:0,
  results:[],
  total_pages:0,
  total_results:0
}

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore,setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, searchTerm = '') => {
    try{

      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm,page);

      setState(prev=>({
        ...movies,
        results:
          page > 1 ? [...prev.results,...movies.results] : [...movies.results]
      }));

      setLoading(false);

    }
    catch(error){
      setError(true);
    }
  }

  // Initial Render and Search
  useEffect(()=>{
    if(!searchTerm){
      const sessionState = isPersistedState('homeState');
      
      if(sessionState)
      {
        console.log("grabbing from storage");
        setState(sessionState);
        return;
      }
    }
    setState(initialState);
    console.log("grabbing from API");
    fetchMovies(1,searchTerm);
  },[searchTerm]);

  // Load More
  useEffect(()=>{
    if(!isLoadingMore) return;

    fetchMovies(state.page+1,searchTerm);
    setIsLoadingMore(false);

  },[isLoadingMore,state.page,searchTerm])

  //Write to sessionStotage
  useEffect(()=>{
    if(!searchTerm)
    {
      sessionStorage.setItem('homeState',JSON.stringify(state));
    }

  },[searchTerm,state]);

  return {state,loading,error,setSearchTerm,searchTerm,setIsLoadingMore};
}