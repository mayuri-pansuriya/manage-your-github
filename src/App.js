import React, { useState } from "react";
import Login from "./component/Login";
import ApolloProv from "./component/AllRepos";
import "./App.css";

const App = () => {
  const [accessToken, setAccesstoken] = useState(
    localStorage.getItem("access_token")
  );
  console.log(accessToken);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              {accessToken ? (
                <button onClick={e => handleLogout()}>logout</button>
              ) : (
                " "
              )}
            </li>
          </ul>
        </div>

        <span class="navbar-toggler-icon"></span>
      </nav>
      {!accessToken ? (
        <li class="nav-item active">
          <Login setAccesstoken={setAccesstoken} />
        </li>
      ) : (
        <li class="nav-item active">
          <ApolloProv accessToken={accessToken} />
        </li>
      )}
    </React.Fragment>
  );
};

export default App;
