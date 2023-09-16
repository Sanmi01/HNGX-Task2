import React, { useState, useRef } from "react";
import logo from "../assets/Logo.png";
import search from "../assets/Search.png";
import menu from "../assets/Menu.png";
import mobileLogo from "../assets/mobleIcon.png";
import noImage from "../assets/noimage.png";
import LoadingPage from "./LoadingPage";
import { Link } from "react-router-dom";
import { fetchData } from "../util/fetchData";

function TopNav() {
  const [searched, setSearched] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const searchIconRef = useRef(null);
  

  function handleSearch() {
    if (inputRef.current?.value === "") return;
    setLoading(true)
    setOpen(true);
    try {
    fetchData(
      `/search/movie?query=${inputRef.current?.value}&include_adult=false&language=en-US&page=1`
    ).then((data) => {
      const movies = data.results.slice(0,5)
      setSearched(movies);
      setLoading(false)
    });
  }catch (error) {
    console.error("Error fetching data: ", error);
    alert("Error fetching data: ", error)
    setLoading(false);
  }
  }

  function getUTC(date) {
    const utcDate = new Date(date).toUTCString();
    const stringdate = utcDate.split(" ").slice(0, 4).join(" ");
    return stringdate;
  }


  return (
    <div className="flex flex-col items-center">
      <nav className="flex justify-between items-center gap-12 py-2 text-white max-w-[1200px] w-full mx-auto">
        <div className="logo">
          <img className="hidden sm:block" src={logo} alt="Movie Box Logo" />
          <img
            className="sm:hidden block"
            src={mobileLogo}
            alt="Movie Box Logo"
          />
        </div>

        <div className="flex items-center gap-2 w-[32.8125rem] border-2 px-3 py-2">
          <input
            type="text"
            placeholder="What do you want to watch?"
            ref={inputRef}
            onKeyDown={(e) => {
              e.key === "Enter" && handleSearch();
            }}
            className="flex-grow rounded-md bg-transparent flex-initial focus:outline-none"
          />
          <div
            className="searchIcon cursor-pointer"
            ref={searchIconRef}
            onClick={handleSearch}
          >
            <img src={search} alt="Search Icon" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="hidden md:block">Sign in</p>
          <div className="menu">
            <img src={menu} alt="signin" />
          </div>
        </div>
      </nav>

      <div
        className={
          open
            ? "absolute w-5/6 max-w-[50rem] top-24 z-[100] px-4 rounded-lg"
            : "hidden"
        }
      >
        {loading ? (
          <div className="w-100 bg-white rounded-3xl">
            <div className="w-100">
              <LoadingPage />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 p-4 bg-white rounded-3xl">
            {(searched?.length === 0 || !searched) && 
            <p>No results</p>
            }
            {searched.map((movie, key) => (
              <>
                <Link
                  to={`/movies/${movie.id}`}
                  className="max-w-200 text-black cursor-pointer"
                  key={key}
                >
                  <div className="bg-[#226f8d] rounded-3xl p-3">
                  <div className="flex flex-row items-center gap-4">
                  {movie.poster_path == null ? (
									<img
										src={noImage}
										className="rounded-3xl w-32 h-32"
                      alt="Poster"
									/>
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
										className="rounded-3xl w-32 h-32"
                      alt="Poster"
									/>
								)}
                    
                    <div className="text-left">
                      <p className="font-bold">
                        Title: {movie.title}
                      </p>
                      <p className="my-3">
                        Release Date: {getUTC(movie.release_date)}
                      </p>
                    </div>
                  </div>
                </div>
                </Link>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TopNav;
