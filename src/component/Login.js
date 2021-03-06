import React from "react";

const Login = ({ setAccesstoken }) => {
  const Loggin = () => {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=fc0fa86c782526ec039c&scope=repo,public_repo`,
      "_self"
    );
  };

  const FetchAccessToken = () => {
    let url = "http://damp-ridge-46292.herokuapp.com";
    fetch(
      `https://github.com/login/oauth/access_token?client_id=fc0fa86c782526ec039c&&client_secret=a4ec68c44ce2fd35b2943803991195725c5eb5ae&&redirect_uri=${url}/&&code=${
        window.location.search.split("=")[1]
      }`,
      {
        method: "POST",
        headers: { Accept: "application/json" }
      }
    )
      .then(resp => resp.json())
      .then(resp => {
        localStorage.setItem("access_token", resp.access_token);
        setAccesstoken(resp.access_token);
      })
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      <button onClick={e => Loggin()}> Login to Github </button>
      <button onClick={e => FetchAccessToken()}> Fetch Access Token </button>
    </React.Fragment>
  );
};

export default Login;
