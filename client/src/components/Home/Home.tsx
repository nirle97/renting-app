import React, { useState } from "react";
import "./home.css";
import network from "../../utils/network";
import Filter from "../Filter/Filter";
function Home() {
  return (
    <div className={"Home-container"}>
      home page
      <Filter />
    </div>
  );
}

export default Home;
