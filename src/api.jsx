export const fetchMoviesByCategory = async (category, page) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
  return fetch(url, options).then((resp) => resp.json());
};

export const fetchMovieDetail = async (movieId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  return fetch(url, options).then((resp) => resp.json());
};

export const CreateRequestToken = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
  };

  return fetch("https://api.themoviedb.org/3/authentication/token/new", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const ValidateRequestTokenWithLogin = async (
  username,
  password,
  requestToken
) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      request_token: requestToken,
    }),
  };
  console.log(requestToken);
  fetch(
    "https://api.themoviedb.org/3/authentication/token/validate_with_login",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const CreateSessionId = async (requestToken) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
    body: JSON.stringify({
      request_token: requestToken,
    }),
  };

  return fetch(
    "https://api.themoviedb.org/3/authentication/session/new",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const getAccountDetail = async (sessionId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/account?session_id=${sessionId}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const getRatedMovies = async (accountId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const getFavoriteMovies = async (accountId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const addFavorite = async (accountId, sessionId, movieId, isadd) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: isadd,
      session_id: sessionId,
    }),
  };

  fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export const addRate = async (accountId, sessionId, movieId, rate) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWVhMDk5NzRkMjM4NDhjY2YyMGRmNDc1NDFkYjBjZiIsInN1YiI6IjY0NzRmMTVmN2NhYTQ3MDBhNzAzMGQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wNP2_R70CHBjW-oD3vxWyNrWyOnu8o5t8lqV3-LG6g",
    },
    body: `{"value":${rate}}`,
  };

  fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
