import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/w500/";

const Row = ({ title, fetchUrl, isLarge }) => {
  const [movies, setmovies] = useState([]);
  const [trailerUrl,setTrailerUrl] =useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(fetchUrl);
      setmovies(data.results);
      return data;
    };
    fetchData();
  }, [fetchUrl]);
   //if [],run once when the row loads,and dont run again
   const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick =(movie)=>{
    if(trailerUrl){
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || " ")
      .then((url) =>{
        // https://www.youtube.com/watch?v=durNwe9pL0E
        const UrlParams =new URLSearchParams(new URL(url).search);
        setTrailerUrl(UrlParams.get("v"));
      })
      .catch((error)=> console.log(error));
    }
  }
  
   return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* several row_posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=> handleClick(movie)}
            className={`row_poster ${isLarge && "row_posterLarge"}`} // if it has large row then use row_posterLarge else normal one
            src={`${base_url}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
