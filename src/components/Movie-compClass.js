import React,{Component} from 'react';
import { useParams } from 'react-router-dom';

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

//Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

//API
import API from '../API';

//Image
import NoImage from '../images/no_image.jpg';

class Movie extends Component {
  
  state={
    movie:{},
    loading:true,
    error:false
  };

  fetchData = async () =>{
    const {movieID} = this.props.params;
    console.log(this.props.params);
    try{
      this.setState({error:false,loading:true});

      const movie = await API.fetchMovie(movieID);
      const credits = await API.fetchCredits(movieID);

      // get directors only
      const directors = credits.crew.filter(
        member=> member.job === 'Director'
      );

      this.setState({
        movie:{
          ...movie,
          actors: credits.cast,
          directors
        },
        loading:false
      });

    }
    catch(error){
      this.setState({error:true,loading:false});
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  render(){
    const {movie,loading,error} = this.state;

    if(loading) return <Spinner/>;

    if(error) return <div>Something Went Wrong</div>;
  
    return(
      <>
        <BreadCrumb movieTitle={movie.original_title}/>
        <MovieInfo movie={movie}/>
        <MovieInfoBar
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
        />
        <Grid>
          {movie.actors.map(actor=>(
            <Actor key={actor.credit_id}          
              name={actor.name}
              character={actor.character}
              imageUrl={
                actor.profile_path ?
                `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
              }
            />
          ))}
        </Grid>
      </>
    )
  }
}
const MovieWithParams = (props) => <Movie {...props} params={useParams()}/>;

export default MovieWithParams;