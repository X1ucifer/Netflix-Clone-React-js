import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./row.css"
import movieTrailer from 'movie-trailer';
import ModalVideo from 'react-modal-video'
import YouTube from 'react-youtube';




const base_url = "https://image.tmdb.org/t/p/original"


function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const [isOpen, setOpen] = useState(false)



    const handleClick = (movie) => {
        console.table("-->ta", movie?.title || movie?.name || movie?.original_name)
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                }).catch((error) => console.log(error));
        }
    }

    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
          autoplay: 0,
        }
      }

    const data = async () => {
        const request = await axios.get(fetchUrl)
        console.log("-->", request)
        setMovies(request.data.results)
    }


    useEffect(() => {
        data();
    }, [fetchUrl])

    return (
        <>
            <div className='row'>
                <h2>{title}</h2>

                <div className='row_posters'>
                    {movies.map((item) => (
                        <>
                            <img key={item.id} onClick={() => handleClick(item)} className={`row_poster ${isLargeRow && "row_posterLarge"}`} src={`${base_url}${isLargeRow ? item.poster_path : item.backdrop_path}`}></img>
                        </>
                    ))}
                </div>

                <div style={{ padding: "40px" }}>
                    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                </div>

            </div>

        </>
    )
}

export default Row