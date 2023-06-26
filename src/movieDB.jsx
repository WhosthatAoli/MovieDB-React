import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import styled from "styled-components";
import Pagination from "./components/Pagination";
import MovieCardList from "./components/MovieCardList";
import Modal from "./components/Modal";
import MovieDetails from "./components/MovieDetails";
import CategorySelect from "./components/CategorySelector";
import { fetchMoviesByCategory } from "./api";
import { Routes, Route } from "react-router-dom";
import { loadMoviesData } from "./Reducers/movieDBSlice";
import LoginPage from "./components/Login";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export default function MovieDB() {
  const isHomePage = useSelector((state) => state.DBReducer.isHomePage);
  const category = useSelector((state) => state.DBReducer.category);
  const page = useSelector((state) => state.DBReducer.page);
  const dispatch = useDispatch();
  const cachedMovies = useSelector((state) => state.DBReducer.cache);
  useEffect(() => {
    if (cachedMovies[category] && cachedMovies[category][page]) {
      dispatch(
        loadMoviesData({
          data: cachedMovies[category][page],
          category,
          page,
        })
      );
    } else {
      fetchMoviesByCategory(category, page).then((data) => {
        dispatch(loadMoviesData({ data, category, page }));
      });
    }
  }, [category, page]);

  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {<CategorySelect />}
              {isHomePage && <Pagination />}
              {<MovieCardList />}
            </div>
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* <Modal>
        <MovieDetails />
      </Modal> */}
    </AppContainer>
  );
}
