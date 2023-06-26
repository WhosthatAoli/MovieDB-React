import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Tabs from "./Tabs";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Reducers/movieDBSlice";
import { useNavigate } from "react-router-dom";
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
`;

const LoginBoxContainer = styled.div`
  width: 100px;
  margin-left: 3rem;
`;

export default function Header() {
  const isloggedIn = useSelector((state) => state.DBReducer.isloggedIn);
  const user = useSelector((state) => state.DBReducer.loggedInUser);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  let loginbox;
  if (isHovered && isloggedIn) {
    loginbox = (
      <div
        className="Login"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleLogout}
      >
        Log out
      </div>
    );
  } else {
    loginbox = (
      <div
        className="Login"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={"/login"}>
          {isloggedIn ? `Welcome ${user.username}` : "Login"}
        </Link>
      </div>
    );
  }

  return (
    <HeaderContainer>
      <Logo />
      <Tabs />
      <LoginBoxContainer>{loginbox}</LoginBoxContainer>
    </HeaderContainer>
  );
}
