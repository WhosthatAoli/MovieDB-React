import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchMovieDetail, addRate } from "../api";
import { useSelector } from "react-redux";

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
`;

const ImgContainer = styled.div`
  width: 33.33%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MovieDetails() {
  const params = useParams();
  console.log(params.movieId);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState();
  const userData = useSelector((state) => state.DBReducer.loggedInUser);
  const isLoggedIn = useSelector((state) => state.DBReducer.isloggedIn);

  useEffect(() => {
    fetchMovieDetail(params.movieId).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, []);
  console.log(movie);

  const ratingSubmit = () => {
    const accountId = userData.accountId;
    const sessionId = userData.sessionId;
    addRate(accountId, sessionId, params.movieId, Number(rating));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </ImgContainer>
      <DetailsContainer>
        <h2>{movie.title}</h2>
        <br />
        <SectionTitle>Overview</SectionTitle>
        <Overview>{movie.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movie.genres.map((genre) => {
            return <GenreItem key={genre.name}>{genre.name}</GenreItem>;
          })}
        </Container>
        <SectionTitle>Rating</SectionTitle>
        <p>{movie.vote_average}</p>
        {isLoggedIn && (
          <SectionTitle>
            Give a rate!
            <input
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
            <button onClick={ratingSubmit}>submit</button>
          </SectionTitle>
        )}
        <SectionTitle>Production companies</SectionTitle>

        <Container>
          <ProductionItem>
            <img src="https://image.tmdb.org/t/p/w500/psjvYkjjgAPtS8utnFYDM8t8yi7.png" />
          </ProductionItem>
          {movie.production_companies.map((company) => {
            return (
              <ProductionItem key={company.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                />
              </ProductionItem>
            );
          })}
        </Container>
      </DetailsContainer>
    </MovieDetailsContainer>
  );
}
