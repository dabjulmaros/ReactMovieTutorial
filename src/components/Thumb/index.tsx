import React from 'react';

import { Link } from 'react-router-dom';

//Styles 
import { Image } from './Thumb.style';

type Props = {
  image:string;
  movieId?:number;
  clickable:boolean;
  title?:string;
}

const Thumb:React.FC<Props> = ({image, movieId, clickable,title}) =>(
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

export default Thumb;