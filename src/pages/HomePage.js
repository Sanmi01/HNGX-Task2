import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import LoadingPage from "../components/LoadingPage";
import imbn from "../assets/imdb.png";
import tomato from "../assets/tomato.png";
import facebook from "../assets/fa-brands_facebook-square.png";
import instagram from "../assets/fa-brands_instagram.png";
import twitter from "../assets/fa-brands_twitter.png";
import youtube from "../assets/fa-brands_youtube.png";
import { fetchData } from "../util/fetchData";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [loadingHero, setLoadingHero] = useState(true);
    const [heroMovie, setHeroMovie] = useState({});
  
  
    useEffect(() => {
      // Fetch top rated movies
      fetchData("/movie/top_rated")
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching top rated movies:", error);
          alert("Error fetching top rated movies:", error);
          setIsLoading(false);
        });
  
      // Fetch hero movie
      fetchData("/movie/458156")
        .then((response) => {
          setHeroMovie(response);
          setLoadingHero(false);
        })
        .catch((error) => {
          console.error("Error fetching hero movie:", error);
          alert("Error fetching movie:", error);
          setLoadingHero(false);
        });
    }, []);
  
  
    const displayHero = heroMovie;
  
    if (isLoading || loadingHero) {
          return <LoadingPage />;
      }
  
    
    if (!Array.isArray(data.results)) return;
    const movies = data.results;
    const sortedMovies = movies
      .slice(0, 12)
      .sort((a, b) => b.vote_average - a.vote_average);
  
  
    return (
      <>
      <div>
        <section className="min-h-[600px] bg-cover bg-center relative  bg-[url(./assets/bgWick.png)] py-8 px-10">
        <Header />
  
  <div className="container mx-auto max-w-[1200px]">
    <div className="text-white mt-[5%] max-w-lg">
      <h2 className="text-4xl md:text-3xl">{displayHero.title}</h2>
      <div className="flex gap-10 mt-4">
        <div className="flex items-center gap-1">
          <img src={imbn} alt="IMDb" />
          <span>86.0 / 100</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={tomato} alt="Tomato" />
          <span>97%</span>
        </div>
      </div>
      <p className="text-lg font-semibold mt-6 max-w-[47ch] line-clamp-4">
        {displayHero.overview}
      </p>
      <Link
        to={{ pathname: "/movie" }}
        className="text-white bg-[#be123c] py-2 px-4 rounded-md flex items-center mt-6 gap-2 max-w-[10rem]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          ></path>
        </svg>
        Watch Trailer
      </Link>
    </div>
  </div>
        </section>

  
        <section
          aria-label="top rated"
          className="py-16 px-4 md:px-16 mt-28"
        >
          <div className="container mx-auto">
            <h2
              id="top-rated"
              className="text-2xl md:text-3xl font-semibold"
            >
              Top Rated
            </h2>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
              {sortedMovies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
  
        <footer className="flex flex-col items-center max-w-[492px] mx-auto mt-28 pb-16 px-4">
          <div className="flex gap-12 social">
            <div className="facebook">
              <img src={facebook} alt="Facebook" />
            </div>
            <div className="instagram">
              <img src={instagram} alt="Instagram" />
            </div>
            <div className="twitter">
              <img src={twitter} alt="Twitter" />
            </div>
            <div className="youtube">
              <img src={youtube} alt="YouTube" />
            </div>
          </div>
          <ul className="flex font-semibold justify-between w-full">
            <li>Conditions of Use</li>
            <li>Privacy & Policy</li>
            <li>Press Room</li>
          </ul>
          <p>© 2023 MovieBox by Awelewa Oluwasanmi Omolade </p>
        </footer>
      </div>
      </>
    );
}

export default HomePage