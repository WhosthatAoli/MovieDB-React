import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addlike } from "../Reducers/movieDBSlice";
import { addFavorite } from "../api";

const MovieCardContainer = styled.div`
  text-align: center;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  .movie-card-img img {
    width: 100%;
  }

  .movie-card-title {
    font-size: 1.2rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  .movie-card-title:hover {
    color: #90cea1;
  }

  .movie-card-rating {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
  }

  .movie-card-rating .icon {
    font-size: 1.5rem;
  }

  .movie-card-rating .rating {
    display: flex;
    align-items: center;
  }

  .movie-card-rating .icon.ion-md-heart-empty {
    cursor: pointer;
  }
  .movie-card-rating .icon.ion-md-heart {
    cursor: pointer;
    color: red;
  }

  .movie-card-rating .icon.rating-icon {
    color: #f5c518;
    margin-right: 0.5rem;
    cursor: default;
  }
`;

export default function MovieCard(props) {
  const likedMovies = useSelector((state) => state.DBReducer.likedMovies);
  const liked = likedMovies.find(
    (likedmovie) => likedmovie.id === props.movie.id
  );
  const isloggedIn = useSelector((state) => state.DBReducer.isloggedIn);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.DBReducer.loggedInUser);

  // const userData = {
  //     username: username,
  //     accountId: userId,
  //     sessionId: sessionId,
  //     requestToken: requestToken,
  //   };
  const onClickLike = (movieId) => {
    dispatch(addlike(movieId));
    if (isloggedIn) {
      const accountId = userData.accountId;
      const sessionId = userData.sessionId;
      if (liked) {
        addFavorite(accountId, sessionId, movieId, false);
      } else {
        addFavorite(accountId, sessionId, movieId, true);
      }
    }
    console.log("clicked like");
  };
  return (
    <MovieCardContainer>
      <div className="movie-card-img">
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
        />
      </div>
      <h4 className="movie-card-title">
        <Link to={`/movies/${props.movie.id}`}>{props.movie.title}</Link>
      </h4>
      <div className="movie-card-rating">
        <div className="rating">
          <i className="icon ion-md-star rating-icon"></i>
          <span>{props.movie.vote_average}</span>
        </div>
        <div onClick={() => onClickLike(props.movie.id)}>
          <i
            className={`like-icon icon ${
              liked ? "ion-md-heart" : "ion-md-heart-empty"
            }`}
          ></i>
        </div>
      </div>
    </MovieCardContainer>
  );
}
