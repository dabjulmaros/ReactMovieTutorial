import React from 'react';

//Styles 
import { Image } from './Thumb.style';

const Thumb = ({image, movieId, clickable,title}) =>(
  <div>
    <Image src={image} alt='movie-thumb' title={title}/>
  </div>
);

export default Thumb;