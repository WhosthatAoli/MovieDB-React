import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES, TABS } from "../constants";

const initialState = {
  movies: [],
  likedMovies: [],
  category: CATEGORIES[0].id,
  page: 1,
  totalPages: 1,
  isHomePage: true,
  activeTab: TABS[0],
  isloggedIn: false,
  loggedInUser: null,
  ratedMovies: [],
  cache: {
    now_playing: {},
    popular: {},
    top_rated: {},
    upcoming: {},
  },
};

export const MovieDBReducer = createSlice({
  name: "movieDB",
  initialState,
  reducers: {
    handldCategroiesChange: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    prevPage: (state) => {
      if (state.page === 1) return;
      state.page = state.page - 1;
    },
    nextPage: (state) => {
      if (state.page === state.totalPages) return;
      state.page = state.page + 1;
    },
    loadMoviesData: (state, action) => {
      state.movies = action.payload.data.results;
      state.totalPages = action.payload.data.total_pages;
      console.log(action.payload);
      state.cache[state.category][action.payload.page] = action.payload.data;
    },
    loadUserLikedMovies: (state, action) => {
      state.likedMovies = action.payload.results;
    },
    loadRatedMovies: (state, action) => {
      state.ratedMovies = action.payload.results;
    },
    addlike: (state, action) => {
      const movieId = action.payload;
      const isInLiked = state.likedMovies.find((movie) => movie.id === movieId);
      if (isInLiked) {
        state.likedMovies = state.likedMovies.filter(
          (movie) => movie.id !== movieId
        );
      } else {
        const movie = state.movies.find((movie) => movie.id === movieId);
        state.likedMovies.push(movie);
      }
    },
    onClickTab: (state, action) => {
      state.activeTab = action.payload;
      state.isHomePage = action.payload.key === "HOME";
    },
    userLogin: (state, action) => {
      state.isloggedIn = true;
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.isloggedIn = false;
      state.loggedInUser = null;
      state.likedMovies = [];
      state.ratedMovies = [];
    },
  },
});

// export const addAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increment());
//   }, 1000);
// };
// Action creators are generated for each case reducer function
export const {
  handldCategroiesChange,
  prevPage,
  nextPage,
  loadMoviesData,
  addlike,
  onClickTab,
  userLogin,
  loadRatedMovies,
  loadUserLikedMovies,
  logout,
} = MovieDBReducer.actions;
//产生object的function，object的type一一对应

export default MovieDBReducer.reducer;
