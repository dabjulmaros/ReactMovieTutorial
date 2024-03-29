import React, {Component} from 'react';

// Config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config';

// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

//Api
import API from '../API';

// Hook
import {useHomeFetch} from '../hooks/useHomeFetch';

// Image
import NoImage from '../images/no_image.jpg';

const initialState = {
  page:0,
  results:[],
  total_pages:0,
  total_results:0
}

class Home extends Component {

  state = {
    movies: initialState,
    searchTerm: '',
    isLoadingMore: false,
    loading: false,
    error: false
  }

  fetchMovies = async (page, searchTerm = '') => {
    try{

      this.setState({error:false,loading:true});
      const movies = await API.fetchMovies(searchTerm,page);

      this.setState(prev=>({
        ...prev,
        movies:{
          ...movies,
        results:
          page > 1 ? [...prev.movies.results,...movies.results] : [...movies.results]
        },
        loading: false
      }));

    }
    catch(error){
      this.setState({error:true,loading:false});
    }
  }

  handleSearch = searchTerm=>{
    this.setState({movies:initialState,searchTerm}, ()=>{
      this.fetchMovies(1,searchTerm);
    })
  };

  handleLoadMore = ()=>{
    this.fetchMovies(this.state.movies.page+1,this.state.searchTerm);
  }

  componentDidMount(){
    this.fetchMovies(1);
  }

  render(){
    const {searchTerm,movies:state,loading,error} = this.state;
    if(error) return <div>Something went wrong...</div>;
    return (
      <>
        {!searchTerm && state.results[0] ?(
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`} 
            title={state.results[0].title} 
            text={state.results[0].overview}
          />
          ):null}
          <SearchBar setSearchTerm={this.handleSearch}/>
          <Grid header={searchTerm?'Search Result':'Popular Movies'}>
            {state.results.map(movie=>(
              <Thumb 
                key={movie.id}
                image={
                  movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage
                }
                clickable
                movieId={movie.id}
                title={`${movie.original_title}\n${movie.overview}`}
              >
                {movie.title}
              </Thumb>
            ))}
          </Grid>
          {loading && <Spinner/>}
          {state.page < state.total_pages && !loading && (
            <Button 
              text='Load More'
              callback={()=>this.handleLoadMore}
            />
          )}
      </>
    );
  }
};

export default Home;