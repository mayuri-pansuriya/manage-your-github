import React, { useState } from "react";
import Login from "./component/Login";
import ApolloProv from "./component/AllRepos";
import "./App.css";

const App = () => {
  const [accessToken, setAccesstoken] = useState(
    localStorage.getItem("access_token")
  );
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Manage Your Github
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
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto d-flex">
            <li className="nav-item active">
              {accessToken ? (
                <button
                  type="button"
                  className="btn ml-auto btn-primary float-right"
                  onClick={e => handleLogout()}
                >
                  logout
                </button>
              ) : (
                " "
              )}
            </li>
          </ul>
        </div>
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
