import React, { useState } from "react";
import "../css/LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateRequestToken,
  CreateSessionId,
  getAccountDetail,
  getFavoriteMovies,
  getRatedMovies,
} from "../api";
import { ValidateRequestTokenWithLogin } from "../api";
import {
  userLogin,
  loadUserLikedMovies,
  loadRatedMovies,
} from "../Reducers/movieDBSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!username || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Perform login logic here, such as making an API request

    const requestTokenRes = await CreateRequestToken();
    //console.log(requestTokenRes.request_token);
    const requestToken = requestTokenRes.request_token;
    await ValidateRequestTokenWithLogin(username, password, requestToken);
    const sessionIdRes = await CreateSessionId(requestToken);
    console.log(sessionIdRes);
    const sessionId = sessionIdRes.session_id;
    console.log(sessionId);
    const userIdRes = await getAccountDetail(sessionId);
    console.log(userIdRes);
    const userId = userIdRes.id;

    const userData = {
      username: username,
      accountId: userId,
      sessionId: sessionId,
      requestToken: requestToken,
    };

    // Dispatch action to update user state
    dispatch(userLogin(userData));

    const userLikedMovies = await getFavoriteMovies(userId);
    console.log(userLikedMovies);
    const userRatedMovies = await getRatedMovies(userId);
    console.log(userRatedMovies);

    dispatch(loadUserLikedMovies(userLikedMovies));
    dispatch(loadRatedMovies(userRatedMovies));

    // Clear form inputs and error
    setUsername("");
    setPassword("");
    setError("");

    // Redirect user to home page
    navigate("/");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
