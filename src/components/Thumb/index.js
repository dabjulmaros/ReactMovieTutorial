import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

//Styles 
import { Image } from './Thumb.style';

const Thumb = ({image, movieId, clickable,title}) =>(
  <div>
    {clickable?
    (
      <Link to={`/${movieId}`}>
        <Image src={image} alt='movie-thumb' title={title}/>
      </Link>
    ):(
      <Image src={image} alt='movie-thumb' title={title}/>
    )}
   
  </div>
);

Thumb.propTypes = {
  image:     PropTypes.string,
  movieId:   PropTypes.number,
  clickable: PropTypes.bool,
  title:     PropTypes.string
}
export default Thumb;