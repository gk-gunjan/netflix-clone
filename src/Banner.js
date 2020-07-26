import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]); //here we use state to randomly show the movie in the bnner image

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      return data;
    };

    fetchData();
  }, []); //here we will left blank the dependency list as because we load the effect only once when the component loads up

  const truncate =(str,n)=>{
      return str?.lenth >n ? str.substr(0 ,n-1)+ "..." : str;

  }

  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
             "https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}"
         )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* title here we use or statement as because we had a another name for some movie so and ? mark here ittirates through the error which we got during fetch */}
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
            {truncate(movie?.overview,150)}
        </h1>

        {/* 1 statement or we can say description */}
      </div>
      <div className="banner_fadeBotton" />
    </header>
  );
};

export default Banner;
