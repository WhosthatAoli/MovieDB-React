import React from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

export default function MovieCardList() {
  const tab = useSelector((state) => state.DBReducer.activeTab);
  //console.log(tab);

  const movies = useSelector((state) => state.DBReducer.movies);
  const likedMovies = useSelector((state) => state.DBReducer.likedMovies);
  const ratedMovies = useSelector((state) => state.DBReducer.ratedMovies);

  if (tab.key === "HOME") {
    return (
      <ListContainer>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ListContainer>
    );
  } else if (tab.key === "LIKED") {
    return (
      <ListContainer>
        {likedMovies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ListContainer>
    );
  } else if (tab === "RATED") {
    return (
      <ListContainer>
        {ratedMovies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </ListContainer>
    );
  }
}
