import { Link, useParams } from "react-router-dom";
import logo from "../assets/movieboxblack.png";
import home from "../assets/Home.png";
import movies from "../assets/Movie_Projector.png";
import series from "../assets/TV_Show.png";
import calender from "../assets/Calendar.png";
import logout from "../assets/Logout.png";
import { useEffect, useState } from "react";
import { fetchData } from "../util/fetchData";
import LoadingPage from "../components/LoadingPage";
import star from "../assets/Star.png";

export default function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [videoSource, setVideoSource] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const director = credits?.crew?.filter((f) => f.job === "Director");
  const writer = credits?.crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const movieResponse = await fetchData(`/movie/${movieId}`);
        const videoResponse = await fetchData(`/movie/${movieId}/videos?language=en-US`);
        const creditResponse = await fetchData(`/movie/${movieId}/credits`);
        setMovie(movieResponse);
        setVideoSource(videoResponse.results);
        setCredits(creditResponse);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);

        alert("Error fetching data: ", error)
        setIsLoading(false);
      }
    }
    fetchMovieData();
  }, [movieId]);

  if (isLoading) {
    return <LoadingPage />;
}

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  function getUTC() {
    const utcDate = new Date(movie.release_date).toUTCString();
    const stringdate = utcDate.split(" ").slice(0, 4).join(" ");
    return stringdate;
  }

  return (
    <div className="flex justify-between">
      <nav className="py-12 max-w-[15rem] w-[15rem] border border-black border-opacity-30 min-h-[calc(100vh-3rem)] rounded-r-[45px] hidden flex-col items-center sticky top-0 md:flex">
        <div className="max-w-[12rem] px-6">
          <img src={logo} alt="" />
        </div>
        <ul className="w-full">
          <li className="flex items-center gap-2 p-8 hover:bg-hsla-10 hover:border-r-[4px] hover:border-r-[#be123c]">
            <img src={home} alt="" />
            <Link to={"/"} className="text-black">Home</Link>
          </li>
          <li className="flex items-center gap-2 bg-hsla-10 border-r-[4px] border-r-[#be123c] p-8">
            <img src={movies} alt="" />
            <Link to={"/movie"} className="text-black">Movies</Link>
          </li>
          <li className="flex items-center gap-2 p-8 hover:bg-hsla-10 hover:border-r-[4px] hover:border-r-[#be123c]">
            <img src={series} alt="" />
            <Link to={"/"} className="text-black">TV Series</Link>
          </li>
          <li className="flex items-center gap-2 p-8 hover:bg-hsla-10 hover:border-r-[4px] hover:border-r-[#be123c]">
            <img src={calender} alt="" />
            <Link to={"/"} className="text-black">Upcoming</Link>
          </li>
        </ul>
        <div className="border border-[#be123cb2] max-w-[150px] px-3 py-8 rounded-[20px] bg-[#bf123d0c]">
          <h4 className="text-sm">Play movie quizes <br /> and earn <br /> free tickets</h4>
          <p className="text-xs">50k people are playing now</p>
          <p className="text-[#be123c] bg-[#d1899b] font-semibold text-xs border border-[#f8e7eb] px-4 py-2 rounded-[50px] ml-2">Start playing</p>
        </div>
        <li className="flex items-center gap-2 p-8 hover:bg-hsla-10 hover:border-r-[4px] hover:border-r-[#be123c] w-full">
          <img src={logout} alt="" />
          <Link to={"/"} className="text-black">Log out</Link>
        </li>
      </nav>
      <main className="max-w-[70rem] w-full px-1 mx-auto">
        <div className="trailer">
          <iframe className="min-h-[35rem] bg-no-repeat bg-cover w-full rounded-3xl mt-20 shadow-lg" src={`https://www.youtube.com/embed/${videoSource[0]?.key}`} title="Movie Trailer"></iframe>
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="max-w-[50rem] mt-8">
            <div className="flex items-center flex-wrap my-4">
            <h1 data-testid="movie-title" className="text-2xl lg:w-[40%]">{movie.title}</h1>
            <div className="flex flex-wrap items-center text-[#404040] gap-4 my-4">
              <span>•</span>
              <p data-testid="movie-release-date" className="">{getUTC()}</p>
              <span>•</span>
              <div className="">
                <p data-testid="movie-runtime" className="">{isLoading ? "Loading" : `${movie.runtime} Minutes`}</p>
              </div>
              <div className="flex flex-wrap">
                {movie?.genres.map((item, key) => (
                  <span key={key} className="text-[#be123c] border border-[#f8e7eb] px-4 py-2 rounded-[50px] ml-2">{item.name}</span>
                ))}
              </div>
            </div>
            </div>
            <p data-testid="movie-overview" className="mt-6 text-sm">{movie.overview}</p>
          </div>
          <div className="hidden md:flex">
            <div className="flex items-center mt-4 gap-4">
              <span>
                <img src={star} alt="vote" />
              </span>
              <span>{movie.vote_average}</span>
              <span>{formatter.format(movie.vote_count)}</span>
            </div>
          </div>
          <div className="text-lg">
        {director?.length > 0 && (
          <p className="text-gray-700 my-2">
            Director:
            <span className="pl-2 text-[#be123c]">
              {director?.map((d, i) => (
                <span className="text-[#be123c]" key={i}>
                  {d.name}
                  {director.length - 1 !== i && ", "}
                </span>
              ))}
            </span>
          </p>
        )}

        {writer?.length > 0 && (
          <p className="text-gray-700 my-2">
            Writers:
            <span className="pl-2">
              {writer?.map((d, i) => (
                <span className="text-[#be123c]" key={i}>
                  {d.name}
                  {writer.length - 1 !== i && ", "}
                </span>
              ))}
            </span>
          </p>
        )}

        {credits?.cast?.length > 0 && (
          <p className="text-gray-700 my-2 lg:mt-0">
            Stars:{" "}
            <span className="pl-2 text-[#be123c]">
              {credits?.cast?.slice(0, 3).map((item, i) => (
                <span key={i}>
                  {item.name}
                  {i !== credits?.cast.length - 1 && ","}
                </span>
              ))}
            </span>
          </p>
        )}
      </div>
        </div>
      </main>
    </div>
  );
}
