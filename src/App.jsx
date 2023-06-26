import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MovieDB from "./movieDB.jsx";

function App() {
  return (
    <div className="App">
      <MovieDB />
    </div>

    // {if(1){
    //   return (<div>1</div>)
    // }}
  );
}

export default App;
